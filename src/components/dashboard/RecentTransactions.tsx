import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'sale';
  asset: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export function RecentTransactions() {
  // Sample data
  const transactions: Transaction[] = [
    {
      id: 'txn-001',
      type: 'purchase',
      asset: 'AAPL',
      amount: 1245.75,
      date: '2023-05-15T10:30:00',
      status: 'completed',
    },
    {
      id: 'txn-002',
      type: 'deposit',
      asset: 'USD',
      amount: 5000,
      date: '2023-05-10T14:15:00',
      status: 'completed',
    },
    {
      id: 'txn-003',
      type: 'sale',
      asset: 'BTC',
      amount: 1250.32,
      date: '2023-05-08T09:45:00',
      status: 'completed',
    },
    {
      id: 'txn-004',
      type: 'withdrawal',
      asset: 'USD',
      amount: 750.50,
      date: '2023-05-05T16:20:00',
      status: 'pending',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'sale':
        return <ArrowDownLeft className="h-5 w-5 text-success-500" />;
      case 'withdrawal':
      case 'purchase':
        return <ArrowUpRight className="h-5 w-5 text-primary-500" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'Deposit';
      case 'withdrawal':
        return 'Withdrawal';
      case 'purchase':
        return 'Purchase';
      case 'sale':
        return 'Sale';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-accent-900 mb-6">Recent Transactions</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-accent-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-accent-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-accent-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">{getTypeIcon(transaction.type)}</div>
                      <div className="text-sm font-medium text-accent-900">
                        {getTypeLabel(transaction.type)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-accent-900">
                    {transaction.asset}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-accent-900 font-medium">
                    ${transaction.amount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-accent-600">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    {getStatusBadge(transaction.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <button className="btn-outline text-sm">View All Transactions</button>
        </div>
      </div>
    </div>
  );
}