import { CoverButton } from "@/shared/ui/cover-button";
import { Input } from "@/shared/ui/input";
import { useUser } from "@/entities/user/model/use-user.tsx";
import MailIcon from "@/shared/assets/icons/mail.svg?react";
import UserIcon from "@/shared/assets/icons/user.svg?react";
import Pen from "@/shared/assets/icons/pen.svg?react";
import { TextArea } from "@/shared/ui/text-area";
import { Button } from "@/shared/ui/button";
import "./edit-profile.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editProfileSchema,
  type EditProfileSchema,
} from "@/pages/profile/profile-info/edit-profile/edit-profile-schema.ts";


export const EditProfile = () => {
  const { user } = useUser();

  const {
    control,
    handleSubmit,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { username: user!.username, email: user!.email, description: user!.description },
    mode: 'onChange',
  });

  const saveChanges = (data: EditProfileSchema) => {
    console.log(data);
  };

  return (
    <section className='edit-profile'>
      <h2>Edit profile</h2>
      <div className='profile-row profile-avatar'>
        <img src={ user!.avatar } alt='your avatar'/>
        <div className='user-info'>
          <div>{ user!.name } { user!.surname }</div>
          <CoverButton>
            <span>Change profile photo</span>
          </CoverButton>
        </div>
      </div>
      <form onSubmit={ handleSubmit(saveChanges) }>
        <Controller
          name="username"
          control={ control }
          render={ ({ field, fieldState: { error } }) => (
            <Input
              { ...field }
              label='Username'
              name='username'
              type='text'
              placeholder='@username'
              icon={ <UserIcon/> }
              error={ error?.message }
              custom
            />
          ) }
        />
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
        <div>
          <Controller
            name="description"
            control={ control }
            render={ ({ field, fieldState: { error } }) => (
              <TextArea
                { ...field }
                label='Description'
                name='description'
                icon={ <Pen/> }
                info='Max 200 chars'
                placeholder='Write your description here...'
                errorMessage={error?.message}
              />
            ) }
          />
        </div>
        <Button type="submit" className='save-profile-button'>Save profile changes</Button>
      </form>
    </section>
  );
};
