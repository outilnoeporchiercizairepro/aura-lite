import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader as Loader2, Mail } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';
import { formatPrice, type StripeProduct } from '../stripe-config';
import { supabase } from '../lib/supabase';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ product, isPopular = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');

  const handlePurchase = async () => {
    try {
      setIsLoading(true);

      const { data: { session } } = await supabase.auth.getSession();

      if (!session && !showEmailInput) {
        setIsLoading(false);
        setShowEmailInput(true);
        return;
      }

      if (!session && (!email || !email.includes('@'))) {
        setIsLoading(false);
        alert('Veuillez entrer une adresse email valide');
        return;
      }

      const checkoutUrl = await createCheckoutSession(product, email || undefined);
      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      alert(error.message || 'Une erreur est survenue. Veuillez réessayer.');
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
        isPopular ? 'ring-2 ring-blue-500 scale-105' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
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
            <span className="text-gray-700">Acces complet a l'academie</span>
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

        {showEmailInput && (
          <div className="mb-4">
            <label htmlFor={`email-${product.priceId}`} className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Votre email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id={`email-${product.priceId}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isPopular
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Redirection...
            </>
          ) : (
            showEmailInput ? 'Continuer vers le paiement' : 'Commencer avec Aura'
          )}
        </button>
      </div>
    </motion.div>
  );
};
