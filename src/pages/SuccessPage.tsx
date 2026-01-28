import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleCheck as CheckCircle, ArrowRight, Hop as Home } from 'lucide-react'
import { Header } from '../components/Header'

export function SuccessPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Refresh the page after a successful purchase to update subscription status
    const timer = setTimeout(() => {
      window.location.reload()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-8">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Paiement réussi !
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Félicitations ! Votre achat a été traité avec succès. Vous avez maintenant accès à 
            la formation Aura Lite complète.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Prochaines étapes
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-sm font-medium text-indigo-600">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Accès à la formation</h3>
                  <p className="text-gray-600">Vous recevrez un email avec vos identifiants d'accès dans les prochaines minutes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-sm font-medium text-indigo-600">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Commencez votre apprentissage</h3>
                  <p className="text-gray-600">Explorez les modules de formation et commencez à construire votre agence AAA.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-sm font-medium text-indigo-600">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Support communautaire</h3>
                  <p className="text-gray-600">Rejoignez notre communauté pour échanger avec d'autres apprenants.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Retour à l'accueil
            </button>
            
            <button
              onClick={() => window.open('mailto:support@auralite.com', '_blank')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Contacter le support
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}