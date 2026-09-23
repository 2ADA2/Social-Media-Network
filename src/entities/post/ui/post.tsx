import { useState } from "react";
import HeartIcon from "@/shared/assets/icons/heart.svg?react";
import CommentIcon from "@/shared/assets/icons/comment.svg?react";
import { CoverButton } from "@/shared/ui/cover-button";
import ArrowDown from "@/shared/assets/icons/arrow-down.svg?react";
import ArrowUp from "@/shared/assets/icons/arrow-up.svg?react";
import "./post.css";
import { useAuth } from "@/features/auth";
import { Avatar } from "@/shared/ui/avatar";
import { CreateComment } from "@/features/create-comment";

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
  const isAuth = useAuth();

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
    <article className={ `post ${isAuth ? "" : "blocked"}`}>
      <header className="post-header">
        <Avatar src={ avatarUrl } alt={ alt } size={ 48 }/>
        <div className="header-data">
          <div>{ author }</div>
          <div className='post-date'>{ date }</div>
        </div>
      </header>

      { imgUrl && <img
          className="post-image"
          loading="lazy"
          src={ imgUrl }
          alt={ alt }
      /> }

      <p>{ description }</p>

      <footer className="post-control">
        <CoverButton onClick={ toggleLike }>
          <div>
            <HeartIcon className={ liked ? "active" : "" }/>
            <span className='control-text'>{ liked ? likes + 1 : likes } likes</span>
          </div>
        </CoverButton>

        <CoverButton onClick={ toggleComments }>
          <div>
            <CommentIcon/>
            <span className='control-text'>{
              isAuth ? ` ${ comments.length } Comments` : "You have to login to see the comments"
            } </span>
            {
              isAuth &&
              (showComments ? <ArrowDown className='arrow-icon'/> : <ArrowUp className={ 'arrow-icon' }/>)
            }
          </div>
        </CoverButton>
      </footer>
      { isAuth && showComments && <>
          <ol className='post-comments'>
            { comments.map(
              (comment, i) => <li key={ i }>{ comment }</li>,
            ) }
          </ol>
          <CreateComment/>
      </> }
    </article>
  );
};
