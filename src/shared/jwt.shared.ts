import { envClient } from './env-client';

const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

const MAX_AGE_ACCESS_TOKEN = 60 * 5; // 5 minutes
const MAX_AGE_REFRESH_TOKEN = 60 * 60 * 24 * 7; // 7 days

const ACCESS_TOKEN_COOKIE_CONFIG = {
  maxAge: MAX_AGE_ACCESS_TOKEN,
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
  domain:
    process.env.NODE_ENV === 'development'
      ? undefined
      : envClient.NEXT_PUBLIC_CORS_COOKIE,
};

const REFRESH_TOKEN_COOKIE_CONFIG = {
  maxAge: MAX_AGE_REFRESH_TOKEN,
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
  domain:
    process.env.NODE_ENV === 'development'
      ? undefined
      : envClient.NEXT_PUBLIC_CORS_COOKIE,
};

export {
  ACCESS_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_COOKIE_CONFIG,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
};
