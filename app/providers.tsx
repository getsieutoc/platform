'use client';

import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'sonner';
import { ModalProvider } from '@/components/modal/provider';
import { theme } from '@/lib/chakra';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <Toaster className="dark:hidden" />
          <Toaster theme="dark" className="hidden dark:block" />
          <ModalProvider>{children}</ModalProvider>
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
