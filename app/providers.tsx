'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { getDefaultConfig } from '@coinbase/onchainkit';
import { ErrorBoundary } from './components/ErrorBoundary';
import { preloadCriticalResources } from '@/lib/optimizations';
import { type ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && 'status' in error && typeof error.status === 'number') {
          if (error.status >= 400 && error.status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
  },
});

const wagmiConfig = getDefaultConfig({
  appName: 'GamerFit Nexus',
  appDescription: 'Game-themed fitness workouts',
  appUrl: 'https://gamerfit.app',
  appIcon: 'https://gamerfit.app/icon.png',
});

// Preload critical resources on app start
if (typeof window !== 'undefined') {
  preloadCriticalResources();
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'cdp_demo_key'}
            chain={base}
          >
            {children}
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  );
}
