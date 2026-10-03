import type { CommentInterface } from "@/entities/comment/types.ts";

export const Comment = (data:CommentInterface) => {
  return (
    <li>{data.text}</li>
  );
};
