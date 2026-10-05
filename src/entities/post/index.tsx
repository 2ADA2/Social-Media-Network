import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeartIcon from '@/shared/assets/icons/heart.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import { CoverButton } from '@/shared/ui/cover-button';
import ArrowDown from '@/shared/assets/icons/arrow-down.svg?react';
import ArrowUp from '@/shared/assets/icons/arrow-up.svg?react';
import { useAuth } from '@/features/auth/use-auth';
import { Avatar } from '@/shared/ui/avatar';
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
import { useLikePost } from "@/features/like-post/use-like-post.ts";
import { useAppSelector } from "@/app/store/hooks.ts";
import { selectUserId } from "@/entities/user/model/selectors.ts";
import { PostComments } from "@/entities/post/post-comments.tsx";

interface PostProps {
  post: PostType;
}

const checkLiked = (likes: { id: number }[], userId: number) => {
    if (userId === -1) {
      return false;
    }

    return likes.some((user) => user.id === userId);
  }
;

export const Post = ({ post }: PostProps) => {
  const { t } = useTranslation('main');
  const { isAuth } = useAuth();

  const currentUserId = Number(useAppSelector(selectUserId)) || -1;
  const [liked, setLiked] = useState(checkLiked(post.likedByUsers, currentUserId));
  const [likes, setLikes] = useState(post.likesCount);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.commentsCount);

  const { mutate: toggleLike, isPending: isLiking } = useLikePost();

  const handleLike = () => {
    if (!isAuth || isLiking) {
      return;
    }

    toggleLike({ postId: post.id, liked: liked });
    setLikes(prev => liked ? prev - 1 : prev + 1);
    setLiked(prev => !prev);
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const addComment = () => {
    setComments(prev => prev + 1);
  };

  return (
    <StyledPost>
      <PostHeader>
        <Avatar src={ post.author.profileImage || "" } alt={ `Post ${ post.id }` } size={ 48 }/>
        <HeaderData>
          <div>{ post.author.firstName } { post.author.secondName }</div>
          <PostDate>{ new Date(post.creationDate).toLocaleDateString() }</PostDate>
        </HeaderData>
      </PostHeader>

      { post.image && (
        <PostImage loading="lazy" src={ post.image } alt={ post.title }/>
      ) }

      <Description>{ post.content }</Description>

      <PostControl $auth={ isAuth }>
        <CoverButton onClick={ handleLike }>
          <ControlContainer>
            <StyledSVG $active={ liked }>
              <HeartIcon/>
            </StyledSVG>
            <ControlText>{ t('post.likes', { count: likes }) }</ControlText>
          </ControlContainer>
        </CoverButton>

        <CoverButton onClick={ toggleComments }>
          <ControlContainer>
            <StyledSVG $active={ false }>
              <CommentIcon/>
            </StyledSVG>
            <ControlText>
              { isAuth
                ? t('post.comments', { count: comments })
                : t('post.loginToSeeComments') }
            </ControlText>
            <StyledArrowIcon>
              { isAuth && (showComments ? <ArrowDown/> : <ArrowUp/>) }
            </StyledArrowIcon>
          </ControlContainer>
        </CoverButton>
      </PostControl>

      { isAuth && showComments && (
        <PostComments postId={post.id} onAdd={addComment}/>
      ) }
    </StyledPost>
  );
};
