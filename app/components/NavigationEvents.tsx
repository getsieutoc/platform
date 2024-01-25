'use client';

import {
  useSearchParams,
  usePathname,
  usePostHog,
  useRouter,
  useAuth,
  useEffect,
} from '@/hooks';
import { newURLWithSearchParams } from '@/lib/utils';

export const NavigationEvents = () => {
  const { session } = useAuth();

  const posthog = usePostHog();

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const signedIn = searchParams.get('signedIn');

  // const selectedPlan = searchParams.get('plan');

  useEffect(() => {
    if (session) {
      const { id, email, name } = session.user;

      const params = new URLSearchParams(searchParams);

      // if (plan === selectedPlan) {
      //   params.delete('plan');
      // }

      if (signedIn) {
        params.delete('signedIn');

        posthog.identify(id, { email, name });

        router.replace(newURLWithSearchParams(pathname, params), { scroll: false });
      }
    }
  });

  return null;
};
