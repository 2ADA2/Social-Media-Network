import { CoverButton } from "@/shared/ui/CoverButton";
import { Input } from "@/shared/ui/Input";
import { useUser } from "@/features/auth";
import MailIcon from "@/shared/assets/icons/mail.svg?react";
import UserIcon from "@/shared/assets/icons/user.svg?react";
import Pen from "@/shared/assets/icons/pen.svg?react";
import React, { type ChangeEvent, useState } from "react";
import { TextArea } from "@/shared/ui/TextArea";
import { Button } from "@/shared/ui/Button";
import "./edit-profile.css";

const MAX_DESCRIPTION_LENGTH = 200;

export const EditProfile = () => {
  const user = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [descriptionError, setDescriptionError] = useState("");

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > MAX_DESCRIPTION_LENGTH) {
      setDescriptionError("Reached the 200 text limit");
    } else {
      setDescriptionError("");
    }

    setDescription(value);
  };

  const saveChanges = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='edit-profile'>
      <h2>Edit profile</h2>
      <div className='profile-row profile-avatar'>
        <img src={ user.avatar } alt='your avatar'/>
        <div className='user-info'>
          <div>{ user.name } { user.surname }</div>
          <CoverButton>
            <span>Change profile photo</span>
          </CoverButton>
        </div>
      </div>
      <form onSubmit={ saveChanges }>
        <Input
          value={ username }
          onChange={ changeName }
          label='Username'
          name='username'
          type='text'
          placeholder='@username'
          info='from 3 to 20 chars'
          icon={ <UserIcon/> }
          minLength={ 3 }
          maxLength={ 20 }
        />
        <Input
          value={ email }
          onChange={ changeEmail }
          label='Email'
          name='email'
          type='email'
          info='enter your email'
          placeholder='example@mail.com'
          icon={ <MailIcon/> }
          minLength={ 3 }
        />
        <div>
          <TextArea
            value={ description }
            onChange={ changeDescription }
            label='Description'
            name='description'
            icon={ <Pen/> }
            info='Max 200 chars'
            placeholder='Write your description here...'
            hasError={ !!descriptionError }
            errorMessage={ descriptionError }
          />
        </div>
        <Button type="submit" className='save-profile-button'>Save profile changes</Button>
      </form>
    </section>
  );
};
