import { type ChangeEvent, useEffect, useState } from "react";
import MailIcon from "@/shared/assets/icons/mail.svg?react";
import PenIcon from "@/shared/assets/icons/pen.svg?react";
import { FileInput } from "@/shared/ui/file-input";
import { useBlockScroll } from "@/shared/lib/hooks/block-scroll/use-block-scroll.tsx";
import {
  StyledCreatePostModal,
  StyledForm, StyledInput, StyledTextArea, StyledTitle,
} from "@/features/create-post/create-post-modal/create-post-modal.styles.ts";
import { StyledButton } from "@/features/create-post/create-post.styles.ts";
import { Controller, useForm } from "react-hook-form";
import {
  createPostSchema,
  type CreatePostData,
} from "@/features/create-post/create-post-modal/create-post-schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost } from "@/features/create-post/hooks/use-create-post.ts";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreateModalProps) => {
  const { blockScroll, unblockScroll } = useBlockScroll();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const { mutate: createPost } = useCreatePost();

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', description: '' },
    mode: 'onTouched',
  });


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
      setFileName('')
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

  const submitForm = (data: CreatePostData) => {
    createPost(
      { title: data.title, content: data.description, file },
      {
        onSuccess: () => {
          reset();
          setFile(null);
          setFileName('');
          onClose();
          alert("Post created"); // TODO: custom message
        },
        onError: (e) => {
          alert("Something went wrong: " + e.message); // TODO: custom message
        },
      },
    );
  };

  return (
    <StyledCreatePostModal isOpen={ isOpen } onClose={ onClose }>
      <StyledForm onSubmit={ handleSubmit(submitForm) } noValidate>
        <StyledTitle>Create a new post</StyledTitle>
        <Controller
          name="title"
          control={ control }
          render={ ({ field, fieldState: { error } }) => (
            <StyledInput
              { ...field }
              icon={ <MailIcon/> }
              label='Post Title'
              name='titile'
              error={ error?.message }
              placeholder='Enter post title'
            />
          ) }
        />
        <Controller
          name="description"
          control={ control }
          render={ ({ field, fieldState: { error } }) => (
            <StyledTextArea $filled={ !!error?.message }
                            { ...field }
                            icon={ <PenIcon/> }
                            label='Description'
                            name='description'
                            placeholder='Write description here...'
                            errorMessage={ error?.message }
            />
          ) }
        />
        <FileInput name='image' fileName={ fileName } onChange={ changeFile }/>
        <StyledButton type='submit'>Create</StyledButton>
      </StyledForm>
    </StyledCreatePostModal>
  );
};
