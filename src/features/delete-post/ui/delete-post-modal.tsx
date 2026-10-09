import { Modal } from '@/shared/ui/modal';
import { StyledTitle } from '@/features/create-post/create-post-modal/create-post-modal.styles.ts';
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
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledTitle>Are you sure?</StyledTitle>
      <Button onClick={handleSubmit}>Delete</Button>
    </Modal>
  );
};
