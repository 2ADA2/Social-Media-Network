import { useState } from 'react';
import HeartIcon from '@/shared/assets/icons/heart.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import { CoverButton } from '@/shared/ui/cover-button';
import ArrowDown from '@/shared/assets/icons/arrow-down.svg?react';
import ArrowUp from '@/shared/assets/icons/arrow-up.svg?react';
import { useAuth } from '@/features/auth/use-auth';
import { Avatar } from '@/shared/ui/avatar';
import { CreateComment } from '@/features/create-comment';
import {
  ControlContainer,
  ControlText,
  Description,
  HeaderData,
  PostComments,
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

interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps) => {
  const { isAuth } = useAuth();
  const [showComments, setShowComments] = useState(false);

  const { mutate: toggleLike, isPending: isLiking } = useLikePost();

  const handleLike = () => {
    if (!isAuth || isLiking) {
      return;
    }

    toggleLike({ postId: post.id, liked: false });
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
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
            <StyledSVG $active={ false }>
              <HeartIcon/>
            </StyledSVG>
            <ControlText>{ post.likesCount } likes</ControlText>
          </ControlContainer>
        </CoverButton>

        <CoverButton onClick={ toggleComments }>
          <ControlContainer>
            <StyledSVG $active={ false }>
              <CommentIcon/>
            </StyledSVG>
            <ControlText>
              { isAuth
                ? `${ post.commentsCount } Comments`
                : 'You have to login to see the comments' }
            </ControlText>
            <StyledArrowIcon>
              { isAuth && (showComments ? <ArrowDown/> : <ArrowUp/>) }
            </StyledArrowIcon>
          </ControlContainer>
        </CoverButton>
      </PostControl>

      { isAuth && showComments && (
        <>
          <PostComments/>
          <CreateComment/>
        </>
      ) }
    </StyledPost>
  );
};
