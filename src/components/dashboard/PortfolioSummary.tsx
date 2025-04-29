import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PortfolioSummary() {
  // Sample data
  const portfolioValue = 24650.75;
  const portfolioChange = 1250.25;
  const portfolioChangePercent = 5.34;
  const isPositive = portfolioChange >= 0;

  const data = {
    labels: ['Stocks', 'Bonds', 'Cash', 'Crypto', 'Real Estate'],
    datasets: [
      {
        label: 'Asset Allocation',
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(20, 184, 166, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="card">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-accent-900 mb-6">Portfolio Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="h-[240px] flex items-center justify-center">
              <Doughnut data={data} options={options} />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div className="bg-accent-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-accent-600 mb-1">Total Portfolio Value</p>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-6 w-6 text-primary-600" />
                      <span className="text-2xl font-bold text-accent-900">
                        {portfolioValue.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-accent-600 mb-1">Change (24h)</p>
                    <div className="flex items-center space-x-2 justify-end">
                      {isPositive ? (
                        <TrendingUp className="h-5 w-5 text-success-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-error-500" />
                      )}
                      <div className="flex items-center">
                        <span className={`text-lg font-bold ${isPositive ? 'text-success-600' : 'text-error-600'}`}>
                          {isPositive ? '+' : ''}
                          {portfolioChange.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className={`ml-1 text-sm ${isPositive ? 'text-success-600' : 'text-error-600'}`}>
                          ({isPositive ? '+' : ''}
                          {portfolioChangePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent-50 p-4 rounded-lg">
                  <p className="text-accent-600 mb-1">Monthly Income</p>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-secondary-600" />
                    <span className="text-xl font-bold text-accent-900">425.50</span>
                  </div>
                </div>
                <div className="bg-accent-50 p-4 rounded-lg">
                  <p className="text-accent-600 mb-1">Annual Return</p>
                  <div className="flex items-center space-x-2">
                    <Percent className="h-5 w-5 text-primary-600" />
                    <span className="text-xl font-bold text-accent-900">8.75%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="btn-outline text-sm">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}