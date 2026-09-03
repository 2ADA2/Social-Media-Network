import "./post.css";
import { HeartIcon } from "@/shared/assets/icons/heart.svg?react";
import { CommentIcon } from "@/shared/assets/icons/comment.svg?react";

interface PostProps {
  title: string,
  author: string,
  avatarUrl: string,
  date: string,
  description: string,
  imgUrl: string,
  alt?: string,
  likes: number,
  comments: number,
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
  return (
    <article className="post">
      <div className="post-header">
        <img src={ avatarUrl } alt={ author + " avatar" }/>
        <div className="header-data">
          <div>{ author }</div>
          <small>{ date }</small>
        </div>
      </div>

      <img loading="lazy" src={ imgUrl } alt={ alt }/>
      <p>{ description }</p>

      <div className="post-control">
        <div className="likes">
          <HeartIcon/>
          <small>{ likes } likes</small>
        </div>
        <div className="comments">
          <CommentIcon/>
          <small>{ comments } comments</small>
        </div>
      </div>
    </article>
  );
};
