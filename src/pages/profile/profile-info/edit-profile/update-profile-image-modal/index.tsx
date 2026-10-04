import { useBlockScroll } from "@/shared/lib/hooks/block-scroll/use-block-scroll.tsx";
import { type ChangeEvent, useEffect, useState } from "react";
import {
  StyledCreatePostModal, StyledTitle,
} from "@/features/create-post/create-post-modal/create-post-modal.styles.ts";
import { FileInput } from "@/shared/ui/file-input";
import { StyledButton } from "@/features/create-post/create-post.styles.ts";
import { useUpdateAvatar } from "@/features/edit-profile/use-update-avatar.ts";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateProfileImageModal = ({ isOpen, onClose }: CreateModalProps) => {
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
      alert('File must be .PNG, .JPG or .pdf');
      e.target.value = '';
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      alert('no more than 10 MB');
      e.target.value = '';
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const updateProfileImage = () => {
    if (!file) {
      alert("You need to choose a new photo"); // TODO: custom message
      return;
    }
    updateAvatar(file, {
      onSuccess: () => {
        alert("Profile image updated successfully"); // TODO: custom message
        onClose();
      },
      onError: (error) => {
        alert("Cannot update your profile page: " + error.message); // TODO: custom message
      },
    });
  };

  return (
    <StyledCreatePostModal isOpen={ isOpen } onClose={ onClose }>
      <StyledTitle>Update your profile photo</StyledTitle>
      <FileInput name='image' fileName={ fileName } onChange={ changeFile }/>
      <StyledButton disabled={ isPending } type='submit' onClick={ updateProfileImage }>Update</StyledButton>
    </StyledCreatePostModal>
  );
};
