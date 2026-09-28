import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import './sign-in.css';
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { PasswordInput } from "@/shared/ui/password-input";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { USER_DATA } from "@/app/store/user-data.ts";
import { type SignInFormData, signInSchema } from "@/pages/signin/signin-schema.ts";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignIn = () => {
  const { auth } = useAuth();

  const {
    control,
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignInFormData) => {
    auth(USER_DATA, "token");
    console.log(data);
  };

  return (
    <div className='auth-container'>
      <section className="sign-in">
        <div className='auth-header'>
          <h1>Sign in into an account</h1>
          <p>
            Enter your email and password <br/>
            to sign in into this app
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Email"
                type="email"
                placeholder="Enter email"
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
                label="Password"
                placeholder="Enter password"
                icon={<EyeIcon />}
                error={error?.message}
                custom
              />
            )}
          />
          <Button type="submit">
            Sign in
          </Button>
        </form>

        <p className="auth-form-footer">
          Forgot to create an account?{ ' ' }
          <Link to={ ROUTES.SIGNUP }>Sign up</Link>
        </p>
      </section>
    </div>
  );
};

export default SignIn;
