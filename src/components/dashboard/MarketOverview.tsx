import { useState } from 'react';
import { ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';

interface MarketItem {
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: string;
}

export function MarketOverview() {
  const [activeTab, setActiveTab] = useState('stocks');
  
  // Sample data
  const marketData: Record<string, MarketItem[]> = {
    stocks: [
      { name: 'Apple Inc.', symbol: 'AAPL', price: 178.85, change: 1.24, volume: '52.3M' },
      { name: 'Microsoft', symbol: 'MSFT', price: 378.92, change: 2.35, volume: '21.7M' },
      { name: 'Google', symbol: 'GOOGL', price: 159.13, change: -0.57, volume: '15.4M' },
      { name: 'Amazon', symbol: 'AMZN', price: 174.42, change: 1.05, volume: '32.1M' },
    ],
    crypto: [
      { name: 'Bitcoin', symbol: 'BTC', price: 57892.15, change: 3.25, volume: '28.5B' },
      { name: 'Ethereum', symbol: 'ETH', price: 3254.75, change: -1.18, volume: '14.2B' },
      { name: 'Solana', symbol: 'SOL', price: 102.35, change: 5.47, volume: '4.7B' },
      { name: 'Cardano', symbol: 'ADA', price: 0.45, change: -2.31, volume: '1.2B' },
    ],
    forex: [
      { name: 'EUR/USD', symbol: 'EUR/USD', price: 1.0925, change: 0.12, volume: '92.4B' },
      { name: 'GBP/USD', symbol: 'GBP/USD', price: 1.2730, change: -0.08, volume: '45.2B' },
      { name: 'USD/JPY', symbol: 'USD/JPY', price: 147.85, change: 0.32, volume: '78.1B' },
      { name: 'AUD/USD', symbol: 'AUD/USD', price: 0.6580, change: -0.15, volume: '31.5B' },
    ],
  };

  const tabs = [
    { id: 'stocks', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
  ];

  return (
    <div className="card">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-accent-900">Market Overview</h2>
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-accent-100 text-accent-700 hover:bg-accent-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-accent-500 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-accent-200">
              {marketData[activeTab].map((item, index) => (
                <tr key={index} className="hover:bg-accent-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-accent-900">{item.name}</div>
                        <div className="text-xs text-accent-500">{item.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-accent-900 font-medium">
                    {activeTab === 'crypto' ? '$' : activeTab === 'stocks' ? '$' : ''}
                    {item.price.toLocaleString('en-US', {
                      minimumFractionDigits: activeTab === 'forex' ? 4 : 2,
                      maximumFractionDigits: activeTab === 'forex' ? 4 : 2,
                    })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                    <div
                      className={`inline-flex items-center ${
                        item.change >= 0 ? 'text-success-600' : 'text-error-600'
                      }`}
                    >
                      {item.change >= 0 ? (
                        <ChevronUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(item.change).toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-accent-600">
                    {item.volume}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-800">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="btn-outline text-sm flex items-center">
            View Full Market Data
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}