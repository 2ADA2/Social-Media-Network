import { type ChangeEvent, useEffect, useState } from "react";
import MailIcon from "@/shared/assets/icons/mail.svg?react";
import PenIcon from "@/shared/assets/icons/pen.svg?react";
import { FileInput } from "@/shared/ui/file-input";
import { useBlockScroll } from "@/shared/lib/hooks/block-scroll/useBlockScroll.tsx";
import {
  StyledCreatePostModal,
  StyledForm, StyledInput, StyledTextArea, StyledTitle,
} from "@/features/create-post/create-post-modal/create-post-modal.styles.ts";
import { StyledButton } from "@/features/create-post/create-post.styles.ts";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreateModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const { blockScroll, unblockScroll } = useBlockScroll();

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    }

    return unblockScroll;
  }, [blockScroll, isOpen, unblockScroll]);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;

    if (!selectedFile) {
      setFile(null);
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

  const submitForm = () => {
    console.log(file);
    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <StyledCreatePostModal isOpen={ isOpen } onClose={ onClose }>
      <StyledForm onSubmit={ submitForm }>
        <StyledTitle>Create a new post</StyledTitle>
        <StyledInput
          icon={ <MailIcon/> }
          label='Post Title'
          name='titile'
          placeholder='Enter post title'
          value={ title }
          onChange={ changeTitle }
          minLength={ 3 }
        />
        <StyledTextArea
          icon={ <PenIcon/> }
          label='Description'
          name='description'
          placeholder='Write description here...'
          value={ description }
          onChange={ changeDescription }
          minLength={ 3 }
        />
        <FileInput name='image' fileName={ fileName } onChange={ changeFile }/>
        <StyledButton type='submit'>Create</StyledButton>
      </StyledForm>
    </StyledCreatePostModal>
  );
};
