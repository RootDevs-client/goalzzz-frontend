'use client';

import AppContextProvider from '@/contexts/XoomAppContent';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function ClientProviders({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <NextTopLoader color="#fb0405" showSpinner={false} />
        <AppContextProvider>{children}</AppContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
