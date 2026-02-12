import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  isPopular?: boolean;
}

const CALENDLY_URL = 'https://calendly.com/aura-academie/appel-de-decouverte-aura-lite';

export const PricingCard: React.FC<PricingCardProps> = ({ name, description, price, isPopular = false }) => {
  const handleJoinClick = () => {
    window.open(CALENDLY_URL, '_blank');
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
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">
            {price}
          </span>
          <span className="text-gray-500 ml-2">paiement unique</span>
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

        <button
          onClick={handleJoinClick}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isPopular
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          } flex items-center justify-center`}
        >
          Rejoindre Aura
        </button>
      </div>
    </motion.div>
  );
};
