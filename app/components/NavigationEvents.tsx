'use client';

import {
  useSearchParams,
  usePathname,
  usePostHog,
  useRouter,
  useAuth,
  useEffect,
} from '@/hooks';

export const NavigationEvents = () => {
  const { session } = useAuth();

  const posthog = usePostHog();

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const signedIn = searchParams.get('signedIn');

  useEffect(() => {
    if (!!signedIn && session?.user) {
      const params = new URLSearchParams(searchParams);

      params.delete('signedIn');

      const { id, email, name } = session.user;

      posthog.identify(id, { email, name });

      const newUrl = !params.toString() ? pathname : `${pathname}?${params}`;

      router.replace(newUrl, { scroll: false });
    }
  });

  return null;
};
