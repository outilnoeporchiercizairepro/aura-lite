import React from 'react'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src="/lite.png" alt="Aura Lite" className="h-10 w-auto" />
              <h1 className="ml-3 text-xl font-bold text-gray-900">Aura Lite</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}