import React, { useState } from 'react';
import { Settings, ArrowDownUp } from 'lucide-react';
import TokenInput from './TokenInput';

const SwapCard = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const handleSwap = () => {
    // Implement swap logic here
    console.log('Swap executed');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Swap</h2>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        <TokenInput
          value={fromAmount}
          onChange={setFromAmount}
          label="From"
          balance="1.45"
          token="ETH"
        />

        <div className="flex justify-center -my-2">
          <button className="bg-blue-100 p-2 rounded-xl hover:bg-blue-200 transition-colors">
            <ArrowDownUp className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        <TokenInput
          value={toAmount}
          onChange={setToAmount}
          label="To"
          balance="0.00"
          token="USDC"
        />

        <div className="bg-gray-50 rounded-xl p-4 mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Slippage Tolerance</span>
            <span className="text-gray-800 font-medium">{slippage}%</span>
          </div>
          <div className="flex gap-2">
            {['0.1', '0.5', '1.0'].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`flex-1 py-1 rounded-lg text-sm font-medium ${
                  slippage === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default SwapCard;