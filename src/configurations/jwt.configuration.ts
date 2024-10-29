import { env } from './env.configuration';

const jwt = {
  accessToken: {
    key: 'access_token',
    config: {
      maxAge: 60 * 5, // 5 minutes
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax' as 'lax',
      domain:
        process.env.NODE_ENV === 'development'
          ? undefined
          : env.client.NEXT_PUBLIC_CORS_COOKIE,
    },
  },
  refreshToken: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax' as 'lax',
    domain:
      process.env.NODE_ENV === 'development'
        ? undefined
        : env.client.NEXT_PUBLIC_CORS_COOKIE,
  },
};
export { jwt };
