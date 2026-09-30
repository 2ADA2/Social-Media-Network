import { Post } from "@/entities/post";
import { Loader } from "@/shared/ui/loader";
import { usePosts } from "@/features/post-feed/usePosts.ts";

export const PostsList = () => {
  const { data, isPending, isError } = usePosts({ limit: 20 });

  if (isPending) {
    return <Loader/>;
  }
  if (isError) {
    throw new Error("Cannot get posts");
  }

  return (
    <>
      { data.items.map((post, i) => <Post key={ i } post={ post }/>) }
    </>
  );
};
