export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const GITHUB_API_VERSION: string = '2022-11-28';
export const TEAM_ID = process.env.TEAM_ID_VERCEL ?? '';
export const VERCEL_TOKEN = process.env.VERCEL_TOKEN ?? '';
export const VERCEL_API_URL = 'https://api.vercel.com';
export const NEXT_PUBLIC_ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? '';
