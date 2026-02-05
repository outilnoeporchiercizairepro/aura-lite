import { useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useStripe = () => {
  const createCheckoutSession = useCallback(async (priceId: string) => {
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceId }
    });

    if (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }

    if (data?.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL received');
    }
  }, []);

  return {
    createCheckoutSession,
  };
};