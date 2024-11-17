'use client';

import { Provider as ChakraProvider } from '@/components/ui/provider';
import { SessionProvider } from 'next-auth/react';
import { Provider as JotaiProvider } from 'jotai';
import { swrConfigs } from '@/lib/swr';
import { ReactNode } from '@/types';
import { SWRConfig } from 'swr';

export function GeneralProviders({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={swrConfigs}>
      <SessionProvider>
        <JotaiProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </JotaiProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
