import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const envServer = createEnv({
  server: {
    CORS_ORIGIN: z.string().min(1),
    CORS_RESOURCE: z.string().nullish(),
  },
  experimental__runtimeEnv: process.env,
});
