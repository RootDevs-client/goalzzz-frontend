'use client';

import AuthContext from '@/contexts/AuthContext';
import AppContextProvider from '@/contexts/XoomAppContent';
import NextTopLoader from 'nextjs-toploader';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainLayout from './MainLayout';

export default function MainProvider({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <NextTopLoader color="#fb0405" showSpinner={false} />
        <AppContextProvider>
          <MainLayout>{children}</MainLayout>
        </AppContextProvider>
      </AuthContext>
    </QueryClientProvider>
  );
}
