import { Post } from "@/entities/post";
import { Loader } from "@/shared/ui/loader";
import { usePosts } from "@/features/post-feed/usePosts.ts";

export const PostsList = () => {
  const { data, isPending, isError, error } = usePosts(20);

  if (isPending) {
    return <Loader/>;
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <>
      { data.items.map((post, i) => <Post key={ i } post={ post }/>) }
    </>
  );
};
