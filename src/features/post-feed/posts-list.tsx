import { Post } from "@/entities/post";
import { Loader } from "@/shared/ui/loader";
import { usePosts } from "@/features/post-feed/usePosts.ts";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersecionObserver";
import { useCallback, useEffect, useState } from "react";
import type { Post as PostType } from "@/entities/post/types.ts";
import "./posts-list.css";

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

  const loadPosts = useCallback(() => {
    if (isFetching || !hasMore) {
      return;
    }

    setOffset((prev) => prev + LIMIT);
  }, []);

  const ref = useIntersectionObserver({ onIntersect: loadPosts });

  if (isPending && !posts.length) {
    return (
      <div className='posts-list-loader-container'>
        <Loader/>
      </div>
    );
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <div className='posts-container'>
      { posts.map((post) => <Post key={ post.id } post={ post }/>) }
      { hasMore && <Loader isBlock={ false }/> }

      <div ref={ ref }></div>
    </div>
  );
};
