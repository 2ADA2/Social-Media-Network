import { Modal } from '@/shared/ui/modal';
import { StyledTitle } from '@/features/create-post/create-post-modal/create-post-modal.styles.ts';

interface ConfirmPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmPasswordModal = ({
  isOpen,
  onClose,
}: ConfirmPasswordModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledTitle>Confirm password</StyledTitle>
    </Modal>
  );
};
