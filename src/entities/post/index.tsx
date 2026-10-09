import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeartIcon from '@/shared/assets/icons/heart.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import { CoverButton } from '@/shared/ui/cover-button';
import ArrowDown from '@/shared/assets/icons/arrow-down.svg?react';
import ArrowUp from '@/shared/assets/icons/arrow-up.svg?react';
import { useAuth } from '@/features/auth/use-auth';
import { Avatar } from '@/shared/ui/avatar';
import { formatCompact } from '@/shared/lib/localization/format-number';
import {
  ControlContainer,
  ControlText,
  Description,
  HeaderData,
  PostControl,
  PostDate,
  PostHeader,
  PostImage,
  StyledArrowIcon,
  StyledPost,
  StyledSVG,
} from './post.styles';
import type { Post as PostType } from '@/entities/post/types';
import { useLikePost } from '@/features/like-post/use-like-post.ts';
import { useAppSelector } from '@/app/store/hooks.ts';
import { selectUserId } from '@/entities/user/model/selectors.ts';
import { PostComments } from '@/entities/post/post-comments.tsx';
import { animated, useSpring, useTransition } from '@react-spring/web';
import { formatRelativeTime } from '@/shared/lib/localization/format-relative-time.ts';

const DEFAULT_IMAGE = '/assets/default-image.png';

interface PostProps {
  post: PostType;
}

const checkLiked = (likes: { id: number }[], userId: number) => {
  if (userId === -1) {
    return false;
  }

  return likes.some((user) => user.id === userId);
};

export const Post = ({ post }: PostProps) => {
  const { t, i18n } = useTranslation('main');
  const { isAuth } = useAuth();

  const currentUserId = Number(useAppSelector(selectUserId)) || -1;
  const [liked, setLiked] = useState(
    checkLiked(post.likedByUsers, currentUserId),
  );
  const [likes, setLikes] = useState(post.likesCount);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.commentsCount);

  const [hasImgError, setHasImgError] = useState(false);

  const { mutate: toggleLike, isPending: isLiking } = useLikePost();

  const heartSpring = useSpring({
    scale: liked ? 1.15 : 1,
    color: liked ? 'var(--color-error)' : 'var(--text-muted)',
    config: { tension: 300, friction: 10 },
  });

  const transitions = useTransition(showComments, {
    from: { opacity: 0, maxHeight: 0 },
    enter: { opacity: 1, maxHeight: 1000 },
    leave: { opacity: 0, maxHeight: 0 },
    config: { tension: 200, friction: 25 },
  });

  const handleLike = () => {
    if (!isAuth || isLiking) {
      return;
    }

    toggleLike({ postId: post.id, liked: liked });
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const addComment = useCallback(() => {
    setComments((prev) => prev + 1);
  }, []);

  const deleteComment = useCallback(() => {
    setComments((prev) => prev - 1);
  }, []);

  const handeImgError = () => {
    setHasImgError(true);
  };

  const date = formatRelativeTime(post.creationDate, i18n.language);

  return (
    <StyledPost>
      <PostHeader>
        <Avatar
          src={post.author.profileImage || ''}
          alt={`Post ${post.id}`}
          size={48}
        />
        <HeaderData>
          <div>
            {post.author.firstName} {post.author.secondName}
          </div>
          <PostDate>{date}</PostDate>
        </HeaderData>
      </PostHeader>

      {post.image && (
        <PostImage
          loading="lazy"
          src={hasImgError ? DEFAULT_IMAGE : post.image}
          alt={post.title}
          onError={handeImgError}
        />
      )}

      <Description>{post.content}</Description>

      <PostControl $auth={isAuth}>
        <CoverButton onClick={handleLike}>
          <ControlContainer>
            <StyledSVG $active={liked}>
              <animated.div
                style={{
                  transform: heartSpring.scale.to((s) => `scale(${s})`),
                  display: 'flex',
                }}
              >
                <HeartIcon />
              </animated.div>
            </StyledSVG>
            <ControlText>
              {likes < 1000
                ? t('post.likes', { count: likes })
                : `${formatCompact(likes, i18n.language)} ${t('post.likesLabel')}`}
            </ControlText>
          </ControlContainer>
        </CoverButton>

        <CoverButton onClick={toggleComments}>
          <ControlContainer>
            <StyledSVG $active={false}>
              <CommentIcon />
            </StyledSVG>
            <ControlText>
              {isAuth
                ? comments < 1000
                  ? t('post.comments', { count: comments })
                  : `${formatCompact(comments, i18n.language)} ${t('post.commentsLabel')}`
                : t('post.loginToSeeComments')}
            </ControlText>
            <StyledArrowIcon>
              {isAuth && (showComments ? <ArrowDown /> : <ArrowUp />)}
            </StyledArrowIcon>
          </ControlContainer>
        </CoverButton>
      </PostControl>

      {isAuth &&
        transitions(
          (style, item) =>
            item && (
              <animated.div style={style}>
                <PostComments
                  postId={post.id}
                  onAdd={addComment}
                  onDelete={deleteComment}
                />
              </animated.div>
            ),
        )}
    </StyledPost>
  );
};
