export const STRIPE_API_VERSION = '2023-10-16';
export const STRIPE_APP_NAME = 'Sieutoc Platform';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const TEAM_ID = process.env.TEAM_ID_VERCEL ?? '';
export const VERCEL_TOKEN = process.env.VERCEL_TOKEN ?? '';
export const NEXT_PUBLIC_ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? '';

export const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const ROW_HEIGHT = 53;
export const MAX_PROJECTS = Number(process.env.MAX_PROJECTS ?? 1);
