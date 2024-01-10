'use client';

import { PostHogProvider as OriginalProvider } from 'posthog-js/react';
import { useSearchParams, usePathname, useEffect } from '@/hooks';
import { ReactNode } from '@/types';
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    throw new Error('Missing NEXT_PUBLIC_POSTHOG_KEY');
  }

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

export function PostHogPageview() {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;

      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  return <OriginalProvider client={posthog}>{children}</OriginalProvider>;
}
