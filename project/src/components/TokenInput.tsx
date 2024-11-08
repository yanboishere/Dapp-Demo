import React from 'react';
import { ChevronDown } from 'lucide-react';

interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  balance: string;
  token: string;
}

const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  label,
  balance,
  token,
}) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 text-sm">{label}</span>
        <span className="text-gray-600 text-sm">
          Balance: {balance} {token}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="bg-transparent text-2xl font-semibold text-gray-900 outline-none flex-1"
        />
        <button className="flex items-center gap-2 bg-white py-2 px-4 rounded-xl shadow-sm hover:bg-gray-50">
          <img
            src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${token === 'ETH' ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' : '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'}/logo.png`}
            alt={token}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-semibold">{token}</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default TokenInput;