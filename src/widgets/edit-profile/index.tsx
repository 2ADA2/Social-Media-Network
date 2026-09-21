import { CoverButton } from "@/shared/ui/CoverButton";
import { Input } from "@/shared/ui/Input";
import { useUser } from "@/features/auth";
import MailIcon from "@/shared/assets/icons/mail.svg?react";
import UserIcon from "@/shared/assets/icons/user.svg?react";
import InfoIcon from "@/shared/assets/icons/info-filled.svg?react";
import Pen from "@/shared/assets/icons/pen.svg?react";
import { type ChangeEvent, useState } from "react";
import { TextArea } from "@/shared/ui/TextArea";
import { Button } from "@/shared/ui/Button";
import "./edit-profile.css";

export const EditProfile = () => {
  const user = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const saveChanges = () => {
    // saved
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
      <Input
        value={ username }
        onChange={ changeName }
        label='Username'
        name='username'
        placeholder='@username'
        icon={ <UserIcon/> }
        defaultValue={ user.username }
        minLength={ 3 }
      />
      <Input
        value={ email }
        onChange={ changeEmail }
        label='Email'
        name='email'
        placeholder='example@mail.com'
        icon={ <MailIcon/> }
        defaultValue={ user.email }
        minLength={ 3 }
      />
      <div>
        <TextArea
          value={ description }
          onChange={ changeDescription }
          label='Description'
          icon={ <Pen/> }
          placeholder='Write your description here...'
          maxLength={ 200 }/>
        <div className='ta-info'>
          <InfoIcon className='ignore'/>
          <small>Max 200 chars</small>
        </div>
      </div>
      <Button className='save-profile-button' onClick={ saveChanges }>Save profile changes</Button>
    </section>
  );
};
