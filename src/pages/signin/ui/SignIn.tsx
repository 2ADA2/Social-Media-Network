import { Input } from "@/shared/ui/Input";
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import { useRef } from "react";
import './SignIn.css';
import { Button } from "@/shared/ui/Button";

export const SignIn = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <section className='auth'>
      <h1>Sign in into an account</h1>
      <p>
        Enter your email and password <br/>
        to sign in into this app
      </p>

      <form className='auth-form'>
        <Input
          label='Email'
          type='email'
          placeholder='Enter email'
          icon={ <MailIcon/> }
          ref={ inputRef }
        />
        <Input
          label='Password'
          type='password'
          placeholder='Enter password'
          icon={ <EyeIcon/> }
          ref={ inputRef }
        />
        <Button>
          Sign in
        </Button>
      </form>
      <p className='auth-form-footer'>
        Forgot to create an account?{ ' ' }
        <a href='/sign-up'>
          Sign up
        </a>
      </p>
    </section>
  );
};
