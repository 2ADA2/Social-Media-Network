import { type ChangeEvent, type SubmitEvent, useState } from 'react';
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

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { auth } = useAuth();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth(USER_DATA, "token");
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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

        <form className="auth-form" onSubmit={ handleSubmit }>
          <Input
            label='Email'
            type='email'
            name='email'
            placeholder='Enter email'
            icon={ <MailIcon/> }
            value={ email }
            onChange={ changeEmail }
            required
          />
          <PasswordInput
            label='Password'
            name='password'
            placeholder='Enter password'
            minLength={ 6 }
            icon={ <EyeIcon/> }
            value={ password }
            onChange={ changePassword }
            required
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
