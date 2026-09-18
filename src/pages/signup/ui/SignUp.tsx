import { Input } from "@/shared/ui/Input";
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import './SignUp.css';
import { Button } from "@/shared/ui/Button";

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <section className='auth'>
      <h1>Create an account</h1>
      <p>
        Enter your email and password <br/>
        to sign up for this app
      </p>

      <form className='auth-form' onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          icon={<MailIcon />}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          icon={<EyeIcon />}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />
        <Button type='submit'>
          Sign in
        </Button>
      </form>
      <small>By clicking continue, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b></small>
      <p className='auth-form-footer'>
        Forgot to create an account?{ ' ' }
        <a href='/sign-in'>
          Sign in
        </a>
      </p>
    </section>
  );
};
