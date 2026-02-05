import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { StripeProduct, formatPrice } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';

interface ProductCardProps {
  product: StripeProduct;
  onPurchase: (priceId: string) => Promise<void>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handlePurchase = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await onPurchase(product.priceId);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-indigo-600">
          {formatPrice(product.price, product.currencySymbol)}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {product.mode === 'payment' ? 'Paiement unique' : 'Abonnement'}
        </div>
      </div>

      <button
        onClick={handlePurchase}
        disabled={!user || isLoading}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Traitement...
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            {user ? 'Acheter maintenant' : 'Connexion requise'}
          </>
        )}
      </button>
    </motion.div>
  );
};