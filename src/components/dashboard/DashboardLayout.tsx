import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart, 
  FileText, 
  Settings, 
 
  BellRing, 
  User, 
  Menu, 
  X 
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard/${account.address}', icon: LayoutDashboard },
    { name: 'AI Advisor', href: '/advisor', icon: MessageSquare },
    { name: 'Investments', href: '/investments', icon: BarChart },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-accent-50">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden transition-opacity ease-linear duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`fixed inset-0 bg-accent-900/50 transition-opacity ease-linear duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div
          className={`relative max-w-xs w-full bg-primary-900 pt-5 pb-4 flex flex-col transition ease-in-out duration-300 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-shrink-0 px-4 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="sr-only">FinAssist</span>
              <div className="h-8 w-8 rounded bg-primary-600 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">FinAssist</span>
            </Link>
          </div>

          <div className="mt-8 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      active
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-100 hover:bg-primary-800 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`mr-4 h-6 w-6 ${
                        active ? 'text-white' : 'text-primary-300 group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex-shrink-0 flex border-t border-primary-800 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-900">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link href="/" className="flex items-center">
                  <span className="sr-only">FinAssist</span>
                  <div className="h-8 w-8 rounded bg-primary-600 flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-2 text-xl font-bold text-white">FinAssist</span>
                </Link>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        active
                          ? 'bg-primary-800 text-white'
                          : 'text-primary-100 hover:bg-primary-800 hover:text-white'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          active ? 'text-white' : 'text-primary-300 group-hover:text-white'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-800 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-accent-700 hover:text-accent-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}