import { Modal } from "@/shared/ui/modal";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { type ChangeEvent, useEffect, useState } from "react";
import MailIcon from "@/shared/assets/icons/mail.svg?react";
import PenIcon from "@/shared/assets/icons/pen.svg?react";
import "./create-post-modal.css";
import { TextArea } from "@/shared/ui/text-area";
import { FileInput } from "@/shared/ui/file-input";
import { useBlockScroll } from "@/features/block-scroll/useBlockScroll.tsx";

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
  }, [isOpen]);

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
    <Modal isOpen={ isOpen } onClose={ onClose } className="create-post-modal">
      <form onSubmit={ submitForm }>
        <div className='form-title'>Create a new post</div>
        <Input
          icon={ <MailIcon/> }
          label='Post Title'
          name='titile'
          placeholder='Enter post title'
          value={ title }
          onChange={ changeTitle }
          minLength={ 3 }
        />
        <TextArea
          icon={ <PenIcon/> }
          label='Description'
          name='description'
          placeholder='Write description here...'
          value={ description }
          onChange={ changeDescription }
          minLength={ 3 }
        />
        <FileInput name='image' fileName={ fileName } onChange={ changeFile }/>
        <Button type='submit'>Create</Button>
      </form>
    </Modal>
  );
};
