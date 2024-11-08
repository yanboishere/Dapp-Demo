import React from 'react';
import SwapCard from './components/SwapCard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full px-6 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-xl font-bold text-gray-800">SimpleDEX</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Connect Wallet
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl px-6 py-12">
        <div className="flex justify-center">
          <SwapCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>This is a demo DEX interface. Not for production use.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;