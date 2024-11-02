import React, { useState, useCallback, useEffect } from 'react';
import { Coins, Trophy, TrendingUp, Wallet } from 'lucide-react';

function App() {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('coins');
    return saved ? parseInt(saved) : 0;
  });
  const [multiplier, setMultiplier] = useState(() => {
    const saved = localStorage.getItem('multiplier');
    return saved ? parseInt(saved) : 1;
  });
  const [clickEffect, setClickEffect] = useState({ show: false, x: 0, y: 0 });

  // Save progress
  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
    localStorage.setItem('multiplier', multiplier.toString());
  }, [coins, multiplier]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClickEffect({ show: true, x, y });
    setTimeout(() => setClickEffect({ show: false, x: 0, y: 0 }), 500);

    setCoins(prev => prev + multiplier);
    
    // Play coin sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  }, [multiplier]);

  const buyMultiplier = () => {
    const cost = multiplier * 100;
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setMultiplier(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
              <Coins className="w-8 h-8" />
              Coin Clicker DApp
            </h1>
            <p className="text-purple-200">Click to earn coins and upgrade your multiplier!</p>
          </div>

          {/* Stats Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="text-yellow-400" />
                <span className="font-bold">{coins} Coins</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-green-400" />
                <span className="font-bold">{multiplier}x Multiplier</span>
              </div>
            </div>
          </div>

          {/* Main Button */}
          <div className="relative">
            <button
              onClick={handleClick}
              className="w-48 h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full
                       shadow-lg hover:shadow-xl transform hover:scale-105 transition-all
                       flex items-center justify-center cursor-pointer
                       active:scale-95 active:shadow-inner"
            >
              <Coins className="w-20 h-20 text-white" />
            </button>
            {clickEffect.show && (
              <div
                className="absolute pointer-events-none text-yellow-300 font-bold
                         animate-bounce-out"
                style={{ left: clickEffect.x, top: clickEffect.y }}
              >
                +{multiplier}
              </div>
            )}
          </div>

          {/* Upgrade Button */}
          <button
            onClick={buyMultiplier}
            disabled={coins < multiplier * 100}
            className={`px-6 py-3 rounded-lg flex items-center gap-2
                     transition-all transform hover:scale-105
                     ${coins >= multiplier * 100
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-600 cursor-not-allowed'}`}
          >
            <Trophy className="w-5 h-5" />
            Upgrade Multiplier ({multiplier * 100} coins)
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;