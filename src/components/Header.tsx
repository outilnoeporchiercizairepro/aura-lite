import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSubscription } from '../hooks/useSubscription'
import { LogOut, User, Crown } from 'lucide-react'

export function Header() {
  const { user, signOut } = useAuth()
  const { subscription } = useSubscription()

  if (!user) return null

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Aura Lite</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {subscription && subscription.subscription_status === 'active' && (
              <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                <Crown className="h-4 w-4 mr-1" />
                {subscription.product_name || 'Plan actif'}
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            
            <button
              onClick={signOut}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}