import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { useStripe } from '../hooks/useStripe';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const { createCheckoutSession } = useStripe();
  const { user } = useAuth();

  const handlePurchase = async (priceId: string) => {
    if (!user) return;
    await createCheckoutSession(priceId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Offres
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez l'offre qui correspond le mieux à vos besoins d'apprentissage
          </p>
        </motion.div>

        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center"
          >
            <p className="text-blue-800">
              <Link to="/auth" className="font-medium underline hover:no-underline">
                Connectez-vous
              </Link>
              {" "}pour accéder aux achats
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STRIPE_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onPurchase={handlePurchase}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};