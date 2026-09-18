import { CoverButton } from "@/shared/ui/CoverButton";
import { Input } from "@/shared/ui/Input";
import { useUser } from "@/features/auth";
import MailIcon from "@/shared/assets/icons/mail.svg?react";
import UserIcon from "@/shared/assets/icons/user.svg?react";
import Pen from "@/shared/assets/icons/pen.svg?react";
import { useRef } from "react";
import { TextArea } from "@/shared/ui/TextArea";
import { Button } from "@/shared/ui/Button";
import "./EditProfile.css";

export const EditProfile = () => {
  const user = useUser();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const saveChanges = () => {
    console.log("saved");
  };

  return (
    <section className='edit-profile'>
      <h2>Edit profile</h2>
      <div className='profile-row profile-avatar'>
        <img src={ user.avatar } alt='your avatar'/>
        <div className='user-info'>
          <div>{ user.name } { user.surname }</div>
          <CoverButton>
            <small>Change profile photo</small>
          </CoverButton>
        </div>
      </div>
      <Input label='Username' icon={ <UserIcon/> } defaultValue={ user.username } ref={ usernameRef }/>
      <Input label='Email' icon={ <MailIcon/> } defaultValue={ user.email } ref={ emailRef }/>
      <TextArea label='Description' icon={ <Pen/> } ref={ descriptionRef } maxLength={200}>
        { user.description }
      </TextArea>
      <Button onClick={ saveChanges }>Save profile changes</Button>
    </section>
  );
};
