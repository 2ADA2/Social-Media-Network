import { TextArea } from "@/shared/ui/TextArea";
import { Button } from "@/shared/ui/Button";
import PenIcon from "@/shared/assets/icons/pen.svg?react";
import { type ChangeEvent, useState } from "react";
import "./create-comment.css";

export const CreateComment = () => {
  const [comment, setComment] = useState('');

  const changeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className='add-comment-section'>
      <TextArea
        icon={ <PenIcon/> }
        label='Add a comment'
        placeholder='Write a comment...'
        onChange={ changeComment }
        value={ comment }
      />
      <Button>Add a comment</Button>
    </div>

  );
};
