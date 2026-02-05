import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Package, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Aura Lite</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Offres</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};