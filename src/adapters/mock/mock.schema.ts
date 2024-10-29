import { z } from 'zod';

const ZGetMockQuery = z.object({
  delay: z.number().optional(),
  error: z.boolean().optional(),
});
type TGetMockQuery = z.infer<typeof ZGetMockQuery>;

const ZGetMockResponse = z.number(); // TODO: Define the schema
type TGetMockResponse = z.infer<typeof ZGetMockResponse>;

export type { TGetMockResponse, TGetMockQuery };
