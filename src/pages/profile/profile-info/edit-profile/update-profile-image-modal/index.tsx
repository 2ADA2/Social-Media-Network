import { useBlockScroll } from "@/shared/lib/hooks/block-scroll/use-block-scroll.tsx";
import { type ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyledCreatePostModal, StyledTitle,
} from "@/features/create-post/create-post-modal/create-post-modal.styles.ts";
import { FileInput } from "@/shared/ui/file-input";
import { StyledButton } from "@/features/create-post/create-post.styles.ts";
import { useUpdateAvatar } from "@/features/edit-profile/use-update-avatar.ts";

const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateProfileImageModal = ({ isOpen, onClose }: CreateModalProps) => {
  const { t } = useTranslation('profile');
  const { blockScroll, unblockScroll } = useBlockScroll();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    }

    return unblockScroll;
  }, [isOpen]);

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;

    if (!selectedFile) {
      setFile(null);
      setFileName('');
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      alert(t('updateAvatar.fileTypeError'));
      e.target.value = '';
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      alert(t('updateAvatar.fileSizeError'));
      e.target.value = '';
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const updateProfileImage = () => {
    if (!file) {
      alert(t('updateAvatar.noFile'));
      return;
    }
    updateAvatar(file, {
      onSuccess: () => {
        alert(t('updateAvatar.success'));
        onClose();
      },
      onError: (error) => {
        alert(t('updateAvatar.error', { message: error.message }));
      },
    });
  };

  return (
    <StyledCreatePostModal isOpen={ isOpen } onClose={ onClose }>
      <StyledTitle>{ t('updateAvatar.title') }</StyledTitle>
      <FileInput name='image' fileName={ fileName } onChange={ changeFile }/>
      <StyledButton disabled={ isPending } type='submit' onClick={ updateProfileImage }>{ t('updateAvatar.submit') }</StyledButton>
    </StyledCreatePostModal>
  );
};
