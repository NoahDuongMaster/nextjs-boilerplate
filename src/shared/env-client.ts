import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_API_ENDPOINT: z.string().min(1).includes('http'),
    NEXT_PUBLIC_AUTH_SCHEMES: z.union([
      z.literal('header'),
      z.literal('cookie'),
      z.string().nullish(),
    ]),
    NEXT_PUBLIC_BASE_URL: z.string().min(1).includes('http'),
    NEXT_PUBLIC_CORS_COOKIE: z.string().min(1),
    NEXT_PUBLIC_DEBUG: z.string().nullish(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
    NEXT_PUBLIC_AUTH_SCHEMES: process.env.NEXT_PUBLIC_AUTH_SCHEMES,
    NEXT_PUBLIC_CORS_COOKIE: process.env.NEXT_PUBLIC_CORS_COOKIE,
  },
});
