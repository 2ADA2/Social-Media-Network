import { Input } from '@/shared/ui/input';
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import KeyboardIcon from '@/shared/assets/icons/keyboard.svg?react';
import './sign-up.css';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { PasswordInput } from '@/shared/ui/password-input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type SignUpFormData,
  signupSchema,
} from '@/pages/signup/signup-schema';
import { useAuth } from '@/features/auth/use-auth';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications.ts';

const SignUp = () => {
  const { t } = useTranslation('auth');
  const { signup } = useAuth();
  const { add } = useNotifications();

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signup(data);
      add({ message: t('signUp.success') });
    } catch (e) {
      add({
        message: t('signUp.error', { message: String(e) }),
        type: 'error',
      });
    }
  };

  return (
    <div className="auth-container">
      <section className="sign-up">
        <div className="sign-up-header">
          <h1>{t('signUp.title')}</h1>
          <p>
            {t('signUp.subtitleLine1')} <br />
            {t('signUp.subtitleLine2')}
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="input-container">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label={t('signUp.email')}
                  type="email"
                  placeholder={t('signUp.emailPlaceholder')}
                  icon={<MailIcon />}
                  error={error?.message}
                  custom
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PasswordInput
                  {...field}
                  label={t('signUp.password')}
                  placeholder={t('signUp.passwordPlaceholder')}
                  icon={<KeyboardIcon />}
                  error={error?.message}
                  custom
                />
              )}
            />
          </div>

          <Button type="submit">{t('signUp.submit')}</Button>
        </form>

        <small>
          {t('signUp.termsPrefix')} <b>{t('signUp.termsOfService')}</b>{' '}
          {t('signUp.and')} <b>{t('signUp.privacyPolicy')}</b>
        </small>

        <p className="auth-form-footer">
          {t('signUp.footer')}{' '}
          <Link to={ROUTES.SIGNIN}>{t('signUp.signInLink')}</Link>
        </p>
      </section>
    </div>
  );
};

export default SignUp;
