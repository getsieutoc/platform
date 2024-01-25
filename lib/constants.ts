import { Plan, Pricing } from '@/types';

export const STRIPE_API_VERSION = '2023-10-16';
export const STRIPE_APP_NAME = 'Sieutoc Platform';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const TEAM_ID = process.env.TEAM_ID_VERCEL ?? '';
export const VERCEL_TOKEN = process.env.VERCEL_TOKEN ?? '';
export const BASE_URL = process.env.NEXTAUTH_URL ?? '';
export const EASYPANEL_URL = process.env.EASYPANEL_URL ?? '';

export const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const ROW_HEIGHT = 53;
export const MAX_PROJECTS = Number(process.env.MAX_PROJECTS ?? 1);

export const LISTMONK_API = process.env.LISTMONK_API ?? '';
export const LISTMONK_SECRET = `${process.env.LISTMONK_ADMIN_USERNAME}:${process.env.LISTMONK_ADMIN_PASSWORD}`;
export const LISTMONK_LISTS: Record<
  'Default' | 'OptIn' | 'Beta',
  { id: number; uuid: string }
> = {
  Default: {
    id: 1,
    uuid: '',
  },
  OptIn: {
    id: 2,
    uuid: '',
  },
  Beta: {
    id: 3,
    uuid: '',
  },
};

export const RESERVED_SLUGS = ['sang', 'aiei'];

export const FEATURES: Record<keyof typeof Plan, Pricing> = {
  [Plan.HOBBY]: {
    monthly: {
      value: 'Free',
    },
    yearly: {
      value: 'Free',
    },
    description: 'Perfect fits your needs',
    ctaText: 'Get Started',
    features: [
      'Max 1 team members',
      'Max 1 project',
      'Intuitive, fast and privacy-friendly dashboard',
    ],
    quota: {
      projects: 1,
      members: 1,
      rows: 100,
    },
  },
  [Plan.PRO]: {
    monthly: {
      currency: '€',
      value: 14,
    },
    yearly: {
      currency: '€',
      value: 9,
    },
    description: 'Enjoy higher limits and extra features for your growth',
    features: [
      `Everything in ${Plan.HOBBY}`,
      'Up to 3 team members',
      'Up to 3 projects',
      'Custom domain',
      'Custom QR Code',
    ],
    quota: {
      projects: 3,
      members: 3,
      rows: 10000,
    },
  },
  [Plan.ENTERPRISE]: {
    monthly: {
      value: 'Custom',
    },
    yearly: {
      value: 'Custom',
    },
    description: 'Elevate with exclusive features',
    ctaText: 'Contact Us',
    features: [
      `Everything in ${Plan.PRO}`,
      'Unlimited team members',
      'Unlimited projects',
      'Technical onboarding',
      'Priority support',
    ],
    quota: {
      projects: 999,
      members: 9999,
      rows: 999999,
    },
  },
};
