import { IS_PRODUCTION } from '@/lib/constants';
import { Metadata, ReactNode } from '@/types';
import { Suspense } from 'react';

import {
  GeneralProviders,
  PostHogProvider,
  PostHogPageview,
  NavigationEvents,
  ChatwootWidget,
} from './components';

export const metadata: Metadata = {
  title: 'Sieutoc Platform',
  description: 'Create modern apps in minutes',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>

      <PostHogProvider>
        <body>
          <GeneralProviders>
            {children}

            <Suspense fallback={null}>
              <NavigationEvents />

              {IS_PRODUCTION && <ChatwootWidget />}
            </Suspense>
          </GeneralProviders>
        </body>
      </PostHogProvider>
    </html>
  );
}
