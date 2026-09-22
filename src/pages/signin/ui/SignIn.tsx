import { type ChangeEvent, type SubmitEvent, useContext, useState } from 'react';
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import './SignIn.css';
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { UserContext } from "@/entities/user";
import { PasswordInput } from "@/shared/ui/password-input";

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(UserContext);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("token", "token");
    if (context?.setIsAuth) {
      context.setIsAuth(true);
    }
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
        <div className='sign-up-header'>
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
