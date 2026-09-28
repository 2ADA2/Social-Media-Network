import { z } from 'zod';

const MAX_DESCRIPTION_LENGTH = 200;

export const editProfileSchema = z.object({
  username: z
    .string()
    .regex(/^@/, 'Username must start with @')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must be at most 20 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email is not valid'),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH, `Reached the ${MAX_DESCRIPTION_LENGTH} text limit`),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
