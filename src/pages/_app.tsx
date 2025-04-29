import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Layout } from '../components/layout/Layout';
import { WagmiProvider } from 'wagmi';
import { ContractProvider } from '../components/context/ContractContext';
import { config } from '@/wagmi';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ContractProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContractProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}