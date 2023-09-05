'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@/components/chakra';
import { Toaster } from 'sonner';
import { SWRConfig } from 'swr';

import { theme, toastOptions } from '@/lib/chakra';
import { fetcher } from '@/lib/utils';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider theme={theme} toastOptions={{ defaultOptions: toastOptions }}>
            <Toaster className="dark:hidden" />
            <Toaster theme="dark" className="hidden dark:block" />
            {children}
          </ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
