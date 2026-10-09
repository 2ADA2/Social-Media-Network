import type { CommentInterface } from '@/entities/comment/types.ts';
import { Avatar } from '@/shared/ui/avatar';
import './comment.css';
import { useDeleteComment } from '@/features/delete-comment/use-delete-comment.ts';
import TrashCanIcon from '@/shared/assets/icons/trashcan.svg?react';
import { useUser } from '@/entities/user/model/use-user.tsx';
import { useTranslation } from 'react-i18next';

interface CommentComponentProps extends CommentInterface {
  onDelete: () => void;
}

export const Comment = (data: CommentComponentProps) => {
  const { t } = useTranslation('main');
  const { mutate: deleteComment, isPending } = useDeleteComment();
  const { user } = useUser();

  const handleDelete = () => {
    deleteComment(
      { commentId: data.id, postId: data.postId },
      {
        onSuccess: data.onDelete,
      },
    );
  };

  const avatarUrl = data?.author?.profileImage ?? '';
  const firstName = data?.author?.firstName || data?.author?.username || 'user';
  const secondName = data?.author?.secondName ?? '';

  const date = data.creationDate;

  return (
    <div className="post-comment">
      <div className="post-comment-header">
        {String(data.author?.id) === user?.id && (
          <button
            className="comment-delete-button"
            disabled={isPending}
            onClick={handleDelete}
            aria-label={t('comment.delete')}
          >
            <TrashCanIcon />
          </button>
        )}
        <Avatar src={avatarUrl} size={32} />
        <div className="post-comment-info">
          <span>
            {firstName} {secondName}
          </span>
          <span>{date}</span>
        </div>
      </div>
      <p className="post-comment-body">{data.text}</p>
    </div>
  );
};
