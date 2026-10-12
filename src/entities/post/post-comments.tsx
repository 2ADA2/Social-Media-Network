import { PostCommentsContainer } from "@/entities/post/post.styles.tsx";
import { CreateComment } from "@/features/create-comment";
import { useQuery } from "@tanstack/react-query";
import { commentsQueries } from "@/features/get-comments/get-comments.ts";
import { Loader } from "@/shared/ui/loader";
import { Comment } from "@/entities/comment";

interface PostCommentsProps {
  postId: number;
}

export const PostComments = ({ postId }: PostCommentsProps) => {
  const { data, isPending, isError } = useQuery(commentsQueries.forPost(postId));

  if (isPending) {
    return <Loader isBlock={ false }/>;
  }

  return (
    <>
      <PostCommentsContainer>
        { isError && <div>Cannot get comments</div> }
        { data && data.map((comment) => <Comment { ...comment } key={ comment.id }/>) }
      </PostCommentsContainer>
      <CreateComment postId={ postId }/>
    </>
  );
};
