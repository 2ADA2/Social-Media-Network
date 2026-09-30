import { Input } from "@/shared/ui/input";
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import KeyboardIcon from '@/shared/assets/icons/keyboard.svg?react';
import './sign-up.css';
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { PasswordInput } from "@/shared/ui/password-input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignUpFormData, signupSchema } from "@/pages/signup/signup-schema.ts";
import { useAuth } from "@/features/auth/use-auth.tsx";

const SignUp = () => {
  const { signup } = useAuth();

  const {
    control,
    handleSubmit,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signup(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="auth-container">
      <section className='sign-up'>
        <div className='sign-up-header'>
          <h1>Create an account</h1>
          <p>
            Enter your email and password <br/>
            to sign up for this app
          </p>
        </div>

        <form className='auth-form' onSubmit={ handleSubmit(onSubmit) } noValidate>
          <div className='input-container'>
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
                  custom
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
                  custom
                />
              ) }
            />
          </div>
          <Button type='submit'>
            Sign up
          </Button>
        </form>

        <small>By clicking continue, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b></small>

        <p className='auth-form-footer'>
          Already have an account?{ ' ' }
          <Link to={ ROUTES.SIGNIN }>
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignUp;
