import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/modal';
import { StyledTitle } from '@/features/create-post/create-post-modal/create-post-modal.styles';
import { Button } from '@/shared/ui/button';

export interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const DeletePostModal = ({
  isOpen,
  onClose,
  onSubmit,
}: DeletePostModalProps) => {
  const { t } = useTranslation('main');

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledTitle>{t('deletePost.title')}</StyledTitle>
      <Button onClick={handleSubmit}>{t('deletePost.submit')}</Button>
    </Modal>
  );
};
