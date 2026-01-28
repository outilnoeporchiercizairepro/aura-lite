import React from 'react'
import { stripeProducts } from '../stripe-config'
import { ProductCard } from '../components/ProductCard'
import { Header } from '../components/Header'
import { Sparkles, Zap, Target } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Créez votre agence <span className="text-indigo-600">AAA</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Automatisation, Agents IA, Marketing et Vente. Maîtrisez les outils de demain 
            et transformez votre expertise en business rentable.
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span>Formation complète</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Zap className="h-5 w-5 text-indigo-600" />
              <span>Outils modernes</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Target className="h-5 w-5 text-indigo-600" />
              <span>Résultats concrets</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <ProductCard key={product.priceId} product={product} />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ce que vous allez apprendre
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatisation</h3>
              <p className="text-gray-600">Créez des workflows automatisés avec n8n</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agents IA</h3>
              <p className="text-gray-600">Développez des agents intelligents</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing</h3>
              <p className="text-gray-600">Stratégies marketing automatisées</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Monétisation</h3>
              <p className="text-gray-600">Transformez vos compétences en revenus</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}