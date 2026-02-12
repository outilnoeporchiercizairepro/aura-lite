import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';

const products = [
  {
    name: 'Accès à Aura Lite',
    description: "Accès à l'académie Aura Lite",
    price: '750,00 €'
  }
];

export const ProductsPage: React.FC = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};