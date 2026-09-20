import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { type ChangeEvent, useState } from "react";
import MailIcon from "@/shared/assets/icons/mail.svg?react";
import PenIcon from "@/shared/assets/icons/pen.svg?react";
import "./create-post-modal.css";
import { TextArea } from "@/shared/ui/TextArea";


const MAX_SIZE = 10 * 1024 * 1024;

export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreateModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

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

    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('File must be .PNG or .JPG');
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
  };

  const submitForm = () => {
    console.log(file);
    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <Modal isOpen={ isOpen } onClose={ onClose } className = "create-post-modal">
      <form onSubmit={ submitForm }>
        <div className='form-title'>Create a new post</div>
        <Input
          icon={ <MailIcon/> }
          label='Post Title'
          placeholder='Enter post title'
          value={ title }
          onChange={ changeTitle }
          minLength={ 3 }
        />
        <TextArea
          icon={ <PenIcon/> }
          label='Description'
          placeholder='Write description here...'
          value={ description }
          onChange={ changeDescription }
          minLength={ 3 }
        />
        <input type='file' onChange={ changeFile }/>
        <Button type='submit'>Create</Button>
      </form>
    </Modal>
  );
};
