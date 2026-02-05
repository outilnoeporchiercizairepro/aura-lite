import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader as Loader2 } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';
import { formatPrice, type StripeProduct } from '../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ product, isPopular = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      const checkoutUrl = await createCheckoutSession(product);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-white rounded-2xl shadow-xl p-8 ${
        isPopular ? 'ring-2 ring-indigo-500 scale-105' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Populaire
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price, product.currencySymbol)}
          </span>
          {product.mode === 'payment' && (
            <span className="text-gray-500 ml-2">paiement unique</span>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Accès complet à l'académie</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Contenu exclusif</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Support communautaire</span>
          </div>
        </div>

        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isPopular
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Redirection...
            </>
          ) : (
            'Commencer maintenant'
          )}
        </button>
      </div>
    </motion.div>
  );
};