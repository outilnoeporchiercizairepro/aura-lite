import { supabase } from './supabase';
import { type StripeProduct } from '../stripe-config';

export const createCheckoutSession = async (product: StripeProduct, email?: string) => {
  const { data: { session } } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      price_id: product.priceId,
      mode: product.mode,
      email: email || undefined,
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/`,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create checkout session');
  }

  const { url } = await response.json();
  return url;
};

export const getUserSubscription = async () => {
  const { data, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data;
};

export const getUserOrders = async () => {
  const { data, error } = await supabase
    .from('stripe_user_orders')
    .select('*')
    .order('order_date', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};