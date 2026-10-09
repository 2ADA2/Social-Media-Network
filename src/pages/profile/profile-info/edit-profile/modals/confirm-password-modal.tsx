import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/modal';
import { StyledTitle } from '@/features/create-post/create-post-modal/create-post-modal.styles';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useUpdateAccount } from '@/features/edit-profile/use-update-account';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';
import axios from 'axios';

interface ConfirmPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  newEmail: string;
}

export const ConfirmPasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
  newEmail,
}: ConfirmPasswordModalProps) => {
  const { t } = useTranslation('profile');
  const [password, setPassword] = useState('');
  const { add } = useNotifications();

  const { mutate: updateAccount, isPending } = useUpdateAccount();

  const handleSubmit = () => {
    if (!password) {
      add({
        message: t('confirmPassword.required'),
        type: 'error',
      });
      return;
    }

    updateAccount(
      { currentPassword: password, email: newEmail },
      {
        onSuccess: () => {
          setPassword('');
          onSuccess();
          onClose();
          add({ message: t('editProfile.emailSuccess') });
        },
        onError: (error) => {
          const isWrongPassword =
            axios.isAxiosError(error) && error.response?.status === 403;

          add({
            message: isWrongPassword
              ? t('confirmPassword.wrongPassword')
              : t('editProfile.error', { message: error.message }),
            type: 'error',
          });
        },
      },
    );
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <StyledTitle>{t('confirmPassword.title')}</StyledTitle>

      <Input
        label={t('confirmPassword.password')}
        type="password"
        placeholder={t('confirmPassword.passwordPlaceholder')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        custom
      />

      <Button type="button" disabled={isPending} onClick={handleSubmit}>
        {t('confirmPassword.submit')}
      </Button>
    </Modal>
  );
};
