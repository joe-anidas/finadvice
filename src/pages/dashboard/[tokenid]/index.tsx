import Head from 'next/head';
import { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { PortfolioSummary } from '../../../components/dashboard/PortfolioSummary';
import { MarketOverview } from '../../../components/dashboard/MarketOverview';
import { RecentTransactions } from '../../../components/dashboard/RecentTransactions';
import { AIInsights } from '../../../components/dashboard/AIInsights';
import { UpcomingActions } from '../../../components/dashboard/UpcomingActions';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <>
   
      <Head>
        <title>Dashboard | FinAssist</title>
        <meta name="description" content="Your personal financial dashboard" />
      </Head>

      <DashboardLayout>
      <br></br> <br></br>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
          
            <PortfolioSummary />
            <div className="mt-6">
              <MarketOverview />
            </div>
            <div className="mt-6">
              <RecentTransactions />
            </div>
          </div>
          <div className="space-y-6">
            <AIInsights />
            <UpcomingActions />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}