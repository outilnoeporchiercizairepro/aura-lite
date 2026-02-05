import React from 'react';
import { motion } from 'framer-motion';
import { PricingCard } from '../components/PricingCard';
import { STRIPE_PRODUCTS } from '../stripe-config';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accédez à l'académie Aura Lite et transformez votre apprentissage
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
            {STRIPE_PRODUCTS.map((product, index) => (
              <PricingCard
                key={product.id}
                product={product}
                isPopular={index === 0}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Paiement sécurisé avec Stripe
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>✓ Garantie 30 jours</span>
            <span>✓ Support client</span>
            <span>✓ Accès immédiat</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};