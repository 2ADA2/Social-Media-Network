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
import { UpdateProfileImageModal } from '@/pages/profile/profile-info/edit-profile/modals/update-profile-image-modal.tsx';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications.ts';
import { Avatar } from '@/shared/ui/avatar';
import { useMemo } from 'react';
import { ConfirmPasswordModal } from '@/pages/profile/profile-info/edit-profile/modals/confirm-password-modal.tsx';

export const EditProfile = () => {
  const { t, i18n } = useTranslation('profile');
  const { user } = useUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const {
    isOpen: isUpdateImageOpen,
    open: openUpdateImage,
    close: closeUpdateImage,
  } = useModal();
  const {
    isOpen: isConfirmOpen,
    open: openConfirm,
    close: closeConfirm,
  } = useModal();
  const { add } = useNotifications();

  const schema = useMemo(() => editProfileSchema(), [i18n.language]);

  const defaultValues = useMemo(
    () => ({
      firstName: user?.name ?? '',
      secondName: user?.surname ?? '',
      username: '@' + (user?.username ?? ''),
      email: user?.email ?? '',
      description: user?.description ?? '',
    }),
    [user],
  );

  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
    reset,
    watch,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const emailValue = watch('email');

  const saveChanges = (data: EditProfileSchema) => {
    data.username = data.username.slice(1);

    const hasProfileChanges =
      dirtyFields.firstName ||
      dirtyFields.secondName ||
      dirtyFields.username ||
      dirtyFields.description;
    const hasEmailChanges = dirtyFields.email;

    if (!hasProfileChanges && !hasEmailChanges) {
      add({ message: t('editProfile.noChanges') });
      return;
    }

    updateProfile(
      {
        firstName: data.firstName,
        secondName: data.secondName,
        username: data.username,
        description: data.description,
      },
      {
        onSuccess: () => {
          add({ message: t('editProfile.success') });
          reset({
            firstName: data.firstName,
            secondName: data.secondName,
            username: '@' + data.username,
            email: data.email,
            description: data.description,
          });
        },
        onError: (error) => {
          add({
            message: t('editProfile.error', { message: error.message }),
            type: 'error',
          });
        },
      },
    );
  };

  const shouldConfirmPassword = (data: EditProfileSchema) => {
    if (dirtyFields.email) {
      openConfirm();
    } else {
      saveChanges(data);
    }
  };

  return (
    <section className="edit-profile">
      <h2>{t('editProfile.title')}</h2>
      <div className="profile-row profile-avatar">
        <Avatar size={92} src={user!.avatar} alt="your avatar" />
        <div className="user-info">
          <div>
            {user!.name} {user!.surname}
          </div>
          <CoverButton onClick={openUpdateImage}>
            <span>{t('editProfile.changePhoto')}</span>
          </CoverButton>
          <UpdateProfileImageModal
            isOpen={isUpdateImageOpen}
            onClose={closeUpdateImage}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(shouldConfirmPassword)} noValidate>
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label={t('editProfile.firstName')}
              placeholder={t('editProfile.firstNamePlaceholder')}
              icon={<UserIcon />}
              error={error?.message}
              custom
            />
          )}
        />
        <Controller
          name="secondName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label={t('editProfile.secondName')}
              placeholder={t('editProfile.secondNamePlaceholder')}
              icon={<UserIcon />}
              error={error?.message}
              custom
            />
          )}
        />
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
        <ConfirmPasswordModal
          newEmail={emailValue}
          isOpen={isConfirmOpen}
          onClose={closeConfirm}
          onSuccess={handleSubmit(saveChanges)}
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
