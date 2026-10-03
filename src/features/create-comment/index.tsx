import { TextArea } from "@/shared/ui/text-area";
import { Button } from "@/shared/ui/button";
import PenIcon from "@/shared/assets/icons/pen.svg?react";
import { type ChangeEvent, use, useState } from "react";
import "./create-comment.css";
import { useCreateComment } from "@/features/create-comment/use-create-comment.ts";
import { NotificationsContext } from "@/app/providers/notifications-context/context.ts";

interface CreateCommentProps {
  postId: number;
}

export const CreateComment = ({ postId }: CreateCommentProps) => {
  const context = use(NotificationsContext);
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
          context?.addNotification({ title: "Success", message: "You commented the post" });
          setComment("");
        },
        onError: () => {
          context?.addNotification({ title: "Error", message: "Cannot add your comment", type: "error" });
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
      <Button type="button" onClick={ createComment }>Add a comment</Button>
    </div>
  );
};
