import { motion } from 'framer-motion';
import { LightbulbIcon, Zap, RefreshCw, Clock } from 'lucide-react';

interface Insight {
  id: string;
  content: string;
  type: 'opportunity' | 'warning' | 'tip';
  timestamp: string;
}

export function AIInsights() {
  // Sample data
  const insights: Insight[] = [
    {
      id: 'ins-001',
      content: 'Your tech allocation is 10% higher than recommended for your risk profile.',
      type: 'warning',
      timestamp: '2h ago',
    },
    {
      id: 'ins-002',
      content: 'XYZ stock is undervalued based on recent earnings. Consider increasing position.',
      type: 'opportunity',
      timestamp: '4h ago',
    },
    {
      id: 'ins-003',
      content: 'Your emergency fund could be earning 1.5% more in a high-yield savings account.',
      type: 'tip',
      timestamp: '1d ago',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Zap className="h-5 w-5 text-warning-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-error-500" />;
      case 'tip':
        return <LightbulbIcon className="h-5 w-5 text-primary-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="card h-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-accent-900">AI Insights</h2>
          <button className="text-accent-600 hover:text-accent-900">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-accent-50 p-4 rounded-lg hover:bg-accent-100 transition-colors"
            >
              <div className="flex">
                <div className="mr-3 mt-1">{getIcon(insight.type)}</div>
                <div>
                  <p className="text-accent-800 mb-1">{insight.content}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-accent-500">{insight.timestamp}</p>
                    <button className="text-xs text-primary-600 hover:text-primary-800">Take Action</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button className="btn-outline text-sm w-full flex items-center justify-center">
            View All Insights
          </button>
        </div>
      </div>
    </div>
  );
}