import { Input } from "@/shared/ui/input";
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import './sign-up.css';
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { PasswordInput } from "@/shared/ui/password-input";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { USER_DATA } from "@/app/store/user-data.ts";

const SignUp = () => {
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
    <div className="auth-container">
      <section className='sign-up'>
        <div className='sign-up-header'>
          <h1>Create an account</h1>
          <p>
            Enter your email and password <br/>
            to sign up for this app
          </p>
        </div>

        <form className='auth-form' onSubmit={ handleSubmit }>
          <div className='input-container'>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              icon={ <MailIcon/> }
              value={ email }
              onChange={ changeEmail }
              required
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter password"
              icon={ <EyeIcon/> }
              value={ password }
              minLength={ 6 }
              onChange={ changePassword }
              required
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
