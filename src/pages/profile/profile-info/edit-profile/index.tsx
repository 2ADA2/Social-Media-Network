import { CoverButton } from '@/shared/ui/cover-button';
import { Input } from '@/shared/ui/input';
import { useUser } from '@/entities/user/model/use-user.tsx';
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import Pen from '@/shared/assets/icons/pen.svg?react';
import { TextArea } from '@/shared/ui/text-area';
import { Button } from '@/shared/ui/button';
import { useTranslation } from 'react-i18next';
import './edit-profile.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editProfileSchema,
  type EditProfileSchema,
} from '@/pages/profile/profile-info/edit-profile/edit-profile-schema.ts';
import { useUpdateProfile } from '@/features/edit-profile/use-update-profile.ts';
import { useModal } from '@/shared/lib/hooks/use-modal.ts';
import { UpdateProfileImageModal } from '@/pages/profile/profile-info/edit-profile/update-profile-image-modal';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications.ts';

export const EditProfile = () => {
  const { t } = useTranslation('profile');
  const { user } = useUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { isOpen, open, close } = useModal();
  const { add } = useNotifications();

  const { control, handleSubmit } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: '@' + user!.username,
      email: user!.email,
      description: user!.description,
    },
    mode: 'onChange',
  });

  const saveChanges = (data: EditProfileSchema) => {
    data.username = data.username.slice(1);
    updateProfile(data, {
      onSuccess: () => {
        add({ message: t('editProfile.success') });
      },
      onError: (error) => {
        add({
          message: t('editProfile.error', { message: error.message }),
          type: 'error',
        });
      },
    });
  };

  return (
    <section className="edit-profile">
      <h2>{t('editProfile.title')}</h2>
      <div className="profile-row profile-avatar">
        <img src={user!.avatar} alt="your avatar" />
        <div className="user-info">
          <div>
            {user!.name} {user!.surname}
          </div>
          <CoverButton onClick={open}>
            <span>{t('editProfile.changePhoto')}</span>
          </CoverButton>
          <UpdateProfileImageModal isOpen={isOpen} onClose={close} />
        </div>
      </div>
      <form onSubmit={handleSubmit(saveChanges)} noValidate>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label={t('editProfile.username')}
              name="username"
              type="text"
              placeholder="@username"
              icon={<UserIcon />}
              error={error?.message}
              custom
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label={t('editProfile.email')}
              placeholder={t('editProfile.emailPlaceholder')}
              icon={<MailIcon />}
              error={error?.message}
              custom
            />
          )}
        />
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextArea
                {...field}
                label={t('editProfile.description')}
                name="description"
                icon={<Pen />}
                info={t('editProfile.maxChars')}
                placeholder={t('editProfile.descriptionPlaceholder')}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="save-profile-button"
        >
          {t('editProfile.submit')}
        </Button>
      </form>
    </section>
  );
};
