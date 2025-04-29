import { motion } from 'framer-motion';
import { CalendarClock, CheckCircle, AlertCircle } from 'lucide-react';

interface Action {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export function UpcomingActions() {
  // Sample data
  const actions: Action[] = [
    {
      id: 'act-001',
      title: 'Review Portfolio Allocation',
      description: 'Annual review of investment allocation and rebalancing.',
      dueDate: '2023-05-20',
      priority: 'high',
    },
    {
      id: 'act-002',
      title: 'Update Financial Goals',
      description: 'Review and update your short and long-term financial objectives.',
      dueDate: '2023-06-01',
      priority: 'medium',
    },
    {
      id: 'act-003',
      title: 'Tax Loss Harvesting',
      description: 'Identify opportunities to offset capital gains with losses.',
      dueDate: '2023-06-15',
      priority: 'low',
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card h-full">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-accent-900 mb-6">Upcoming Actions</h2>

        <div className="space-y-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-accent-200 rounded-lg p-4 hover:border-primary-300 hover:bg-accent-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-accent-900">{action.title}</h3>
                {getPriorityBadge(action.priority)}
              </div>
              <p className="text-sm text-accent-600 mb-3">{action.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-accent-500">
                  <CalendarClock className="h-3 w-3 mr-1" />
                  Due: {new Date(action.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <button className="text-xs text-primary-600 hover:text-primary-800 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Complete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button className="btn-outline text-sm w-full flex items-center justify-center">
            View All Actions
          </button>
        </div>
      </div>
    </div>
  );
}