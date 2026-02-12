import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
}

const CALENDLY_URL = 'https://calendly.com/aura-academie/appel-de-decouverte-aura-lite';

export const ProductCard: React.FC<ProductCardProps> = ({ name, description, price }) => {
  const handleJoinClick = () => {
    window.open(CALENDLY_URL, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold text-blue-600">
          {price}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Paiement unique
        </div>
      </div>

      <button
        onClick={handleJoinClick}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Rejoindre Aura
      </button>
    </motion.div>
  );
};