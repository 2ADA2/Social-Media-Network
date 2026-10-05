import { z } from 'zod';
import i18n from '@/shared/config/i18n';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, i18n.t('validation.emailRequired', { ns: 'auth' }))
    .email(i18n.t('validation.emailInvalid', { ns: 'auth' })),
  password: z
    .string()
    .min(8, i18n.t('validation.passwordMin', { ns: 'auth' }))
    .regex(/[a-zA-Z]/, i18n.t('validation.passwordLetter', { ns: 'auth' }))
    .regex(/[0-9]/, i18n.t('validation.passwordDigit', { ns: 'auth' })),
});

export type SignInFormData = z.infer<typeof signInSchema>;
