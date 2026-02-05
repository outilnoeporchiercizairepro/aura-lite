import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, AlertCircle } from 'lucide-react';
import { getUserSubscription, getUserOrders } from '../lib/stripe';
import { getProductByPriceId } from '../stripe-config';

export const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subData, ordersData] = await Promise.all([
          getUserSubscription(),
          getUserOrders()
        ]);
        
        setSubscription(subData);
        setOrders(ordersData || []);
      } catch (err) {
        console.error('Error fetching subscription data:', err);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      </div>
    );
  }

  // Check for active subscription or completed orders
  const hasActiveAccess = subscription?.subscription_status === 'active' || 
                         orders.some(order => order.order_status === 'completed');

  const getAccessInfo = () => {
    if (subscription?.subscription_status === 'active') {
      const product = getProductByPriceId(subscription.price_id);
      return {
        type: 'subscription',
        name: product?.name || 'Abonnement actif',
        status: 'Actif'
      };
    }

    const completedOrder = orders.find(order => order.order_status === 'completed');
    if (completedOrder) {
      return {
        type: 'purchase',
        name: 'Accès à Aura Lite',
        status: 'Acheté'
      };
    }

    return null;
  };

  const accessInfo = getAccessInfo();

  if (!accessInfo) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-700">Aucun accès actif</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4"
    >
      <div className="flex items-center">
        <Crown className="w-5 h-5 text-indigo-600 mr-2" />
        <div>
          <h3 className="font-medium text-indigo-900">{accessInfo.name}</h3>
          <p className="text-sm text-indigo-700">Statut: {accessInfo.status}</p>
        </div>
      </div>
    </motion.div>
  );
};