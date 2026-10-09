import TrashCanIcon from '@/shared/assets/icons/trashcan.svg?react';
import './delete-post-button.css';
import { useDeletePost } from '@/features/delete-post/use-delete-post.ts';
import { DeletePostModal } from '@/features/delete-post/ui/delete-post-modal.tsx';
import { useModal } from '@/shared/lib/hooks/use-modal.ts';

export interface DeletePostButtonProps {
  postId: number;
  currentUserId: number;
  authorId: number;
  onDelete: (postId: number) => void;
}

export const DeletePostButton = ({
  postId,
  authorId,
  currentUserId,
  onDelete,
}: DeletePostButtonProps) => {
  const { mutate: deletePost, isPending } = useDeletePost();
  const { isOpen, open, close } = useModal();

  const handleDelete = () => {
    deletePost(postId, {
      onSuccess: () => {
        onDelete(postId);
      },
    });
  };

  if (Number(currentUserId) !== authorId) {
    return null;
  }

  return (
    <>
      <DeletePostModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={handleDelete}
      />
      <button
        className="delete-post-button"
        disabled={isPending}
        onClick={open}
      >
        <TrashCanIcon />
      </button>
    </>
  );
};
