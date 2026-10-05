import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import KeyboardIcon from '@/shared/assets/icons/keyboard.svg?react';
import './sign-in.css';
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { PasswordInput } from "@/shared/ui/password-input";
import { useAuth } from "@/features/auth/use-auth.tsx";
import { type SignInFormData, signInSchema } from "@/pages/signin/signin-schema.ts";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation('auth');
  const { signin } = useAuth();

  const {
    control,
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signin(data.email, data.password);
    } catch (e) {
      alert(t('signIn.error', { message: String(e) }));
      console.error(e);
    }
  };

  return (
    <div className="auth-container">
      <section className="sign-in">
        <div className="auth-header">
          <h1>{ t('signIn.title') }</h1>
          <p>
            { t('signIn.subtitleLine1') } <br/>
            { t('signIn.subtitleLine2') }
          </p>
        </div>

        <form className="auth-form" onSubmit={ handleSubmit(onSubmit) } noValidate>
          <Controller
            name="email"
            control={ control }
            render={ ({ field, fieldState: { error } }) => (
              <Input
                { ...field }
                label="Email"
                type="email"
                placeholder="Enter email"
                icon={ <MailIcon/> }
                error={ error?.message }
              />
            ) }
          />

          <Controller
            name="password"
            control={ control }
            render={ ({ field, fieldState: { error } }) => (
              <PasswordInput
                { ...field }
                label="Password"
                placeholder="Enter password"
                icon={ <KeyboardIcon/> }
                error={ error?.message }
              />
            ) }
          />

          <Button type="submit">
            { t('signIn.submit') }
          </Button>
        </form>

        <p className="auth-form-footer">
          { t('signIn.footer') }{ ' ' }
          <Link to={ ROUTES.SIGNUP }>{ t('signIn.signUpLink') }</Link>
        </p>
      </section>
    </div>
  );
};


export default SignIn;
