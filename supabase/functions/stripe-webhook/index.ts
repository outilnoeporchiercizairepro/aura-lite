import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // get the signature from the header
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    // get the raw body
    const body = await req.text();

    // verify the webhook signature
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  console.info(`Received Stripe event: ${event.type}`);

  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    console.info('No stripe data found in event');
    return;
  }

  if (!('customer' in stripeData)) {
    console.info('No customer field in stripe data');
    return;
  }

  // for one time payments, we only listen for the checkout.session.completed event
  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    console.info('Skipping payment_intent.succeeded without invoice');
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    console.error(`No customer received on event: ${JSON.stringify(event)}`);
  } else {
    console.info(`Processing event for customer: ${customerId}`);
    let isSubscription = true;

    if (event.type === 'checkout.session.completed') {
      const { mode } = stripeData as Stripe.Checkout.Session;

      isSubscription = mode === 'subscription';

      console.info(`Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`);
    }

    const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

    if (isSubscription) {
      console.info(`Starting subscription sync for customer: ${customerId}`);
      try {
        await syncCustomerFromStripe(customerId);
        console.info(`Subscription synced, now sending to n8n webhook`);
        await sendToN8nWebhook(customerId, 'subscription');
      } catch (error) {
        console.error('Error processing subscription:', error);
      }
    } else if (mode === 'payment' && payment_status === 'paid') {
      try {
        // Extract the necessary information from the session
        const {
          id: checkout_session_id,
          payment_intent,
          amount_subtotal,
          amount_total,
          currency,
        } = stripeData as Stripe.Checkout.Session;

        // Insert the order into the stripe_orders table
        const { error: orderError } = await supabase.from('stripe_orders').insert({
          checkout_session_id,
          payment_intent_id: payment_intent,
          customer_id: customerId,
          amount_subtotal,
          amount_total,
          currency,
          payment_status,
          status: 'completed',
        });

        if (orderError) {
          console.error('Error inserting order:', orderError);
        } else {
          console.info(`Successfully processed one-time payment for session: ${checkout_session_id}`);
        }

        console.info(`Now sending one-time payment to n8n webhook`);
        await sendToN8nWebhook(customerId, 'one_time_payment');
      } catch (error) {
        console.error('Error processing one-time payment:', error);
      }
    }
  }
}

async function sendToN8nWebhook(customerId: string, paymentType: string) {
  try {
    console.info(`[N8N] Starting webhook send for customer: ${customerId}, type: ${paymentType}`);

    const customer = await stripe.customers.retrieve(customerId);
    console.info(`[N8N] Customer retrieved: ${customer.email}`);

    if (!customer || customer.deleted) {
      console.error(`Customer ${customerId} not found or deleted`);
      return;
    }

    const { data: subscriptionData } = await supabase
      .from('stripe_subscriptions')
      .select('*')
      .eq('customer_id', customerId)
      .maybeSingle();

    console.info(`[N8N] Subscription data retrieved: ${subscriptionData ? 'found' : 'not found'}`);

    const { data: stripeCustomerData } = await supabase
      .from('stripe_customers')
      .select('user_id')
      .eq('customer_id', customerId)
      .maybeSingle();

    console.info(`[N8N] Stripe customer data retrieved: ${stripeCustomerData ? 'found' : 'not found'}`);

    let authUserData = null;
    if (stripeCustomerData?.user_id) {
      const { data, error } = await supabase.auth.admin.getUserById(stripeCustomerData.user_id);
      if (!error && data) {
        authUserData = data.user;
        console.info(`[N8N] Auth user data retrieved for user_id: ${stripeCustomerData.user_id}`);
      }
    }

    const webhookData = {
      customer_id: customerId,
      email: customer.email,
      name: customer.name,
      payment_type: paymentType,
      subscription: subscriptionData,
      user: authUserData ? {
        id: authUserData.id,
        email: authUserData.email,
        created_at: authUserData.created_at,
      } : null,
      timestamp: new Date().toISOString(),
    };

    console.info(`[N8N] Sending webhook to n8n with data: ${JSON.stringify(webhookData)}`);

    const response = await fetch('https://n8n.srv802543.hstgr.cloud/webhook/acces-aura-lite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    const responseText = await response.text();
    console.info(`[N8N] Response status: ${response.status}, body: ${responseText}`);

    if (!response.ok) {
      console.error(`[N8N] Failed to send webhook to n8n: ${response.status} ${response.statusText}`);
    } else {
      console.info(`[N8N] Successfully sent webhook to n8n for customer: ${customerId}`);
    }
  } catch (error) {
    console.error('[N8N] Error sending webhook to n8n:', error);
  }
}

// based on the excellent https://github.com/t3dotgg/stripe-recommendations
async function syncCustomerFromStripe(customerId: string) {
  try {
    // fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    // TODO verify if needed
    if (subscriptions.data.length === 0) {
      console.info(`No active subscriptions found for customer: ${customerId}`);
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          subscription_status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        console.error('Error updating subscription status:', noSubError);
        throw new Error('Failed to update subscription status in database');
      }
    }

    // assumes that a customer can only have a single subscription
    const subscription = subscriptions.data[0];

    // store subscription state
    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    }
    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}