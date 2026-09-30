import { Post } from "@/entities/post";
import { Loader } from "@/shared/ui/loader";
import { usePosts } from "@/features/post-feed/usePosts.ts";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersecionObserver";
import { useEffect, useState } from "react";
import type { Post as PostType } from "@/entities/post/types.ts";

const LIMIT = 20;

export const PostsList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [offset, setOffset] = useState(0);
  const { data, isPending, isError, error, isFetching } = usePosts(LIMIT, offset);

  useEffect(() => {
    if (!data) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosts((prev) => {
      return [...prev, ...data.items];
    });
  }, [data]);

  const hasMore = data ? posts.length < data.total : false;

  const loadPosts = () => {
    if (isFetching || !hasMore) {
      return;
    }

    setOffset((prev) => prev + LIMIT);
  };

  const ref = useIntersectionObserver({ onIntersect: loadPosts });

  if (isPending && !posts.length) {
    return <Loader/>;
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <>
      { posts.map((post, i) => <Post key={ i } post={ post }/>) }
      { hasMore && <Loader isBlock={ false }/> }

      <div ref={ ref }></div>
    </>
  );
};
