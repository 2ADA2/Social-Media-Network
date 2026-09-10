import { useState } from "react";
import HeartIcon from "@/shared/assets/icons/heart.svg?react";
import CommentIcon from "@/shared/assets/icons/comment.svg?react";
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
  comments: number;
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
                       comments = 0,
                     }: PostProps) => {
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
            <small>{ comments } comments</small>
          </div>
        </CoverButton>
      </footer>
      { showComments && <div>comments</div> }
    </article>
  );
};
