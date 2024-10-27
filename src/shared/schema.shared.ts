import { z } from 'zod';

const AUTH_SCHEMES = z.enum(['cookie', 'header']);

export { AUTH_SCHEMES };
