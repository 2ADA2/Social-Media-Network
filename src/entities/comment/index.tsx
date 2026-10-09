import type { CommentInterface } from '@/entities/comment/types.ts';
import { Avatar } from '@/shared/ui/avatar';
import './comment.css';

export const Comment = (data: CommentInterface) => {
  const avatarUrl = data?.author?.profileImage ?? '';
  const firstName = data?.author?.firstName || data?.author?.username || 'user';
  const secondName = data?.author?.secondName ?? '';

  const date = data.creationDate;

  return (
    <div className="post-comment">
      <div className="post-comment-header">
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
