import React, { useState } from 'react'
import { StripeProduct, formatPrice } from '../stripe-config'
import { Check, Loader as Loader2, Mail } from 'lucide-react'

interface ProductCardProps {
  product: StripeProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [email, setEmail] = useState('')

  const handlePurchase = async () => {
    if (!showEmailInput) {
      setShowEmailInput(true)
      return
    }

    if (!email || !email.includes('@')) {
      alert('Veuillez entrer une adresse email valide')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          email: email,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session de paiement')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'achat:', error)
      alert(error.message || 'Une erreur est survenue lors de l\'achat')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <div className="text-4xl font-bold text-indigo-600 mb-4">
          {formatPrice(product.price, product.currency)}
        </div>
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
          {product.mode === 'payment' ? 'Paiement unique' : 'Abonnement'}
        </span>
      </div>

      <p className="text-gray-600 mb-8 leading-relaxed">
        {product.description}
      </p>

      <div className="space-y-3 mb-8">
        <div className="flex items-center text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          Formation complète AAA
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          Maîtrise de n8n
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          Automatisations IA
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          Monétisation des services
        </div>
      </div>

      {showEmailInput && (
        <div className="mb-4">
          <label htmlFor={`email-${product.priceId}`} className="block text-sm font-medium text-gray-700 mb-2">
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
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      )}

      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Redirection...
          </>
        ) : (
          showEmailInput ? 'Continuer vers le paiement' : 'Acheter maintenant'
        )}
      </button>
    </div>
  )
}