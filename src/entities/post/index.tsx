import { useState } from "react";
import HeartIcon from "@/shared/assets/icons/heart.svg?react";
import CommentIcon from "@/shared/assets/icons/comment.svg?react";
import { CoverButton } from "@/shared/ui/cover-button";
import ArrowDown from "@/shared/assets/icons/arrow-down.svg?react";
import ArrowUp from "@/shared/assets/icons/arrow-up.svg?react";
import "./post.css";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { Avatar } from "@/shared/ui/avatar";
import { CreateComment } from "@/features/create-comment";
import {
  ControlContainer, ControlText,
  Description,
  HeaderData,
  PostComments, PostControl,
  PostDate,
  PostHeader,
  PostImage, StyledArrowIcon,
  StyledPost, StyledSVG,
} from "@/entities/post/post.styles.tsx";

interface PostProps {
  title: string;
  author: string;
  avatarUrl: string;
  date: string;
  description: string;
  imgUrl?: string;
  alt?: string;
  likes: number;
  comments: string[];
}

export const Post = ({
                       title,
                       author,
                       avatarUrl,
                       date,
                       imgUrl,
                       description,
                       alt = title,
                       likes = 0,
                       comments = [],
                     }: PostProps) => {
  const { isAuth } = useAuth();

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = () => {
    if (isAuth) {
      setLiked((prev) => !prev);
    }
  };

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <StyledPost>
      <PostHeader>
        <Avatar src={ avatarUrl } alt={ alt } size={ 48 }/>
        <HeaderData>
          <div>{ author }</div>
          <PostDate>{ date }</PostDate>
        </HeaderData>
      </PostHeader>

      { imgUrl && <PostImage
          loading="lazy"
          src={ imgUrl }
          alt={ alt }
      /> }

      <Description>{ description }</Description>

      <PostControl>
        <CoverButton onClick={ toggleLike }>
          <ControlContainer>
            <StyledSVG $active={ liked }>
              <HeartIcon/>
            </StyledSVG>
            <ControlText className='control-text'>{ liked ? likes + 1 : likes } likes</ControlText>
          </ControlContainer>
        </CoverButton>

        <CoverButton onClick={ toggleComments }>
          <ControlContainer>
            <StyledSVG $active={ false }>
              <CommentIcon/>
            </StyledSVG>
            <ControlText className='control-text'>{
              isAuth ? ` ${ comments.length } Comments` : "You have to login to see the comments"
            } </ControlText>

            <StyledArrowIcon>
              {
                isAuth &&
                (showComments ? <ArrowDown className='arrow-icon'/> : <ArrowUp className={ 'arrow-icon' }/>)
              }
            </StyledArrowIcon>
          </ControlContainer>
        </CoverButton>
      </PostControl>
      { isAuth && showComments && <>
          <PostComments>
            { comments.map(
              (comment, i) => <li key={ i }>{ comment }</li>,
            ) }
          </PostComments>
          <CreateComment/>
      </> }
    </StyledPost>
  );
};
