import { Post } from '@/entities/post';
import { Loader } from '@/shared/ui/loader';
import { usePosts } from '@/features/post-feed/usePosts.ts';
import { useIntersectionObserver } from '@/shared/lib/hooks/use-intersection-observer.ts';
import { useEffect, useState, useCallback } from 'react';
import type { Post as PostType } from '@/entities/post/types.ts';
import './posts-list.css';
import { CreatePost } from '@/features/create-post';
import { useQueryClient } from '@tanstack/react-query';
import { postsQueries } from '@/features/post-feed/posts-query.ts';

const LIMIT = 20;

export const PostsList = () => {
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [offset, setOffset] = useState(0);
  const { data, isPending, isError, error, isFetching } = usePosts(
    LIMIT,
    offset,
  );

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
  }, [hasMore, isFetching]);

  const deletePost = (postId: number) => {
    setPosts((posts) => posts.filter((post) => post.id !== postId));
  };

  const addPost = async (postId: number) => {
    if (hasMore) return;

    const newPost = await queryClient.fetchQuery(postsQueries.byId(postId));

    if (!newPost) return;

    setPosts((prev) => {
      if (prev.some((p) => p.id === postId)) return prev;
      return [...prev, newPost];
    });
  };
  const ref = useIntersectionObserver({ onIntersect: loadPosts });

  if (isPending && !posts.length) {
    return (
      <div className="posts-list-loader-container">
        <Loader />
      </div>
    );
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <>
      <CreatePost onAdd={addPost} />
      <div className="posts-container">
        {posts.map((post, i) => (
          <Post key={i} post={post} onDelete={deletePost} />
        ))}
        {!isFetching && <div ref={ref}></div>}
        {hasMore && <Loader isBlock={false} />}
      </div>
    </>
  );
};
