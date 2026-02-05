import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, CircleCheck as CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { getProductByPriceId } from '../stripe-config';

interface SubscriptionData {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
}

export const SubscriptionStatus: React.FC = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('subscription_status, price_id, current_period_end')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching subscription:', error);
        } else if (data && data.subscription_status === 'active') {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (loading || !user) return null;

  if (!subscription) return null;

  const product = getProductByPriceId(subscription.price_id);
  const expiryDate = subscription.current_period_end 
    ? new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-FR')
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-3">
        <Crown className="w-5 h-5 text-yellow-300" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{product?.name || 'Plan actif'}</span>
            <CheckCircle className="w-4 h-4 text-green-300" />
          </div>
          {expiryDate && (
            <div className="text-sm text-indigo-100">
              Valide jusqu'au {expiryDate}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};