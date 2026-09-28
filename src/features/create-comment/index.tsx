import { TextArea } from "@/shared/ui/text-area";
import { Button } from "@/shared/ui/button";
import PenIcon from "@/shared/assets/icons/pen.svg?react";
import { type ChangeEvent, useState } from "react";
import "./create-comment.css";

export const CreateComment = () => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const check = (length: number) => {
    if (1 > length || length > 200) {
      setError("Comment length at least 1, at most 200");
      return false;
    }

    setError('');
    return true;
  };

  const changeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    check(e.target.value.length);
  };

  const createComment = () => {
    if (check(comment.length)) {
      setComment("");
    }
  };

  return (
    <div className='add-comment-section'>
      <TextArea
        icon={ <PenIcon/> }
        label='Add a comment'
        placeholder='Write a comment...'
        onChange={ changeComment }
        value={ comment }
        errorMessage={ error }
      />
      <Button type="button" onClick={ createComment }>Add a comment</Button>
    </div>
  );
};
