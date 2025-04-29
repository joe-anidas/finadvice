'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContract } from '../context/ContractContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { connectWallet, disconnectWallet, account } = useContract();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (account?.address) {
      router.push(`/dashboard/${account.address}`);
    }
  }, [account?.address, router]);

  const handleConnect = async () => {
    setLoading(true);
    await connectWallet();
    setLoading(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard/${account.address}' },
    { name: 'AI Advisor', href: '/advisor' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="sr-only">FinAssist</span>
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary-600 text-white">
                <BarChart2 className="h-6 w-6" />
              </div>
              <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-accent-900' : 'text-white'}`}>
                FinAssist
              </span>
            </Link>
          </div>

          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-accent-900 hover:text-accent-700' : 'text-white hover:text-primary-100'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="hidden md:flex space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium ${
                  isScrolled
                    ? router.pathname === item.href
                      ? 'text-primary-600'
                      : 'text-accent-900 hover:text-primary-600'
                    : router.pathname === item.href
                    ? 'text-white font-semibold'
                    : 'text-primary-100 hover:text-white'
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {account?.address ? (
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-medium ${
                    isScrolled ? 'text-accent-900' : 'text-white'
                  }`}
                >
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 rounded-md bg-red-500 text-white text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="btn-primary text-sm"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
        >
          <div className="rounded-lg shadow-lg bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary-600 text-white">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 inline-flex items-center justify-center text-accent-700 hover:text-accent-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-accent-900 hover:text-primary-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              {account?.address ? (
                <div className="flex flex-col space-y-3">
                  <span className="text-accent-900 text-sm">
                    Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
                  </span>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleConnect();
                    setIsOpen(false);
                  }}
                  className="w-full btn-primary text-center text-sm"
                >
                  {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
