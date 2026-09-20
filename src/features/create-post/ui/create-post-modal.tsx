import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { type ChangeEvent, useState } from "react";

const MAX_SIZE = 10 * 1024 * 1024;

export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreatePostInterface {
  title: string;
  description: string;
  file: File | null;
}

export const CreatePostModal = ({ isOpen, onClose }: CreateModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
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
    console.log("submit");
    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <Modal isOpen={ isOpen } onClose={ onClose }>
      <form onSubmit={ submitForm }>
        <Input value={ title } onChange={ changeTitle } minLength={ 3 }/>
        <Input value={ description } onChange={ changeDescription } minLength={ 3 }/>
        <input type='file' onChange={ changeFile }/> // shared component
        <Button type='submit'>Create</Button>
      </form>
    </Modal>
  );
};
