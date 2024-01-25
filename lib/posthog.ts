import { PostHog } from 'posthog-node';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (!POSTHOG_KEY) {
  throw new Error('Missing PostHog setup');
}

const options = {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  flushInterval: 0,
  flushAt: 1,
};

declare global {
  // We need var in declare global
  // eslint-disable-next-line no-var, vars-on-top
  var posthog: PostHog | undefined;
}

const posthog = global.posthog || new PostHog(POSTHOG_KEY, options);

if (process.env.NODE_ENV === 'development') {
  global.posthog = posthog;
}

export { posthog };
