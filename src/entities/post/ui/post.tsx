import { useState } from "react";
import HeartIcon from "@/shared/assets/icons/heart.svg?react";
import CommentIcon from "@/shared/assets/icons/comment.svg?react";
import ArrowDown from "@/shared/assets/icons/arrow-down.svg?react";
import ArrowUp from "@/shared/assets/icons/arrow-up.svg?react";
import { CoverButton } from "@/shared/cover-button/ui/coverButton.tsx";
import "./post.css";

interface PostProps {
  title: string;
  author: string;
  avatarUrl: string;
  date: string;
  description: string;
  imgUrl: string;
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
  const [isAuth] = useState(false); // useAuth in future

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <article className="post">
      <header className="post-header">
        <img
          className="author-avatar"
          src={ avatarUrl }
          alt={ `${ author } avatar` }
        />
        <div className="header-data">
          <div>{ author }</div>
          <small>{ date }</small>
        </div>
      </header>

      <img
        className="post-image"
        loading="lazy"
        src={ imgUrl }
        alt={ alt }
      />

      <p>{ description }</p>

      <footer className="post-control">
        <CoverButton onClick={ toggleLike }>
          <div>
            <HeartIcon className={ liked ? "active" : "" }/>
            <small>{ liked ? likes + 1 : likes } likes</small>
          </div>
        </CoverButton>

        <CoverButton onClick={ toggleComments }>
          <div>
            <CommentIcon/>
            <small>{
              isAuth ? ` ${ comments.length } Comments` : "You have to login to see the comments"
            } </small>
            {
              isAuth &&
              (showComments ? <ArrowDown className='arrow-icon'/> : <ArrowUp className={ 'arrow-icon' }/>)
            }
          </div>
        </CoverButton>
      </footer>
      { isAuth && showComments && <ol className='post-comments'>
        { comments.map(
          (comment, i) => <li key={ i }>{ comment }</li>,
        ) }
      </ol> }
    </article>
  );
};
