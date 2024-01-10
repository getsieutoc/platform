'use client';

import { ChakraProvider } from '@/components/chakra';
import { theme, toastOptions } from '@/lib/chakra';
import { SessionProvider } from 'next-auth/react';
import { Provider as JotaiProvider } from 'jotai';
import { swrConfigs } from '@/lib/swr';
import { ReactNode } from '@/types';
import dynamic from 'next/dynamic';
import { SWRConfig } from 'swr';

const ColorModeScript = dynamic(
  () => import('@chakra-ui/react').then((mod) => mod.ColorModeScript),
  { ssr: false }
);

export function GeneralProviders({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={swrConfigs}>
      <SessionProvider>
        <JotaiProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraProvider theme={theme} toastOptions={toastOptions}>
            {children}
          </ChakraProvider>
        </JotaiProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
