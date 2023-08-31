'use client';

import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'sonner';
import { theme, toastOptions } from '@/lib/chakra';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme} toastOptions={{ defaultOptions: toastOptions }}>
          <Toaster className="dark:hidden" />
          <Toaster theme="dark" className="hidden dark:block" />
          {children}
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
