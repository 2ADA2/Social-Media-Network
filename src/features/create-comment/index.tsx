import { TextArea } from "@/shared/ui/text-area";
import { Button } from "@/shared/ui/button";
import PenIcon from "@/shared/assets/icons/pen.svg?react";
import { type ChangeEvent, useState } from "react";
import "./create-comment.css";
import { useCreateComment } from "@/features/create-comment/use-create-comment.ts";
import { useNotifications } from "@/app/providers/notifications-context/useNotifications.ts";

interface CreateCommentProps {
  postId: number;
  onAdd: () => void;
}

export const CreateComment = ({ postId, onAdd }: CreateCommentProps) => {
  const { add } = useNotifications();
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const { mutate: requestCreateComment, isPending } = useCreateComment();

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
      requestCreateComment({ text: comment, postId: postId }, {
        onSuccess: () => {
          add({ message: "You commented the post" });
          onAdd();
          setComment("");
        },
        onError: () => {
          add({ message: "Cannot add your comment", type: "error" });
        },
      });
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
        disabled={ isPending }
      />
      <Button disabled={ isPending } type="button" onClick={ createComment }>Add a comment</Button>
    </div>
  );
};
