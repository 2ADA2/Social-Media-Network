import { z } from 'zod';

const MAX_DESCRIPTION_LENGTH = 1000;

export const createPostSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH, `Reached the ${MAX_DESCRIPTION_LENGTH} text limit`),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
