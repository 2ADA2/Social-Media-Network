import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Post } from '@/entities/post';
import { Loader } from '@/shared/ui/loader';
import { CreatePost } from '@/features/create-post';
import { usePosts } from '@/features/post-feed/usePosts';
import { postsQueries } from '@/features/post-feed/posts-query';
import { prependPost } from '@/features/post-feed/update-posts-cache';
import { useIntersectionObserver } from '@/shared/lib/hooks/use-intersection-observer';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';
import './posts-list.css';

export const PostsList = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('main');
  const { add } = useNotifications();

  const {
    data,
    isPending,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePosts();

  const posts = data?.pages.flatMap((page) => page.items) ?? [];

  const loadPosts = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const addPost = async (postId: number) => {
    try {
      const newPost = await queryClient.fetchQuery(postsQueries.byId(postId));

      if (!newPost) {
        add({ message: t('post.addError'), type: 'error' });
        return;
      }

      queryClient.setQueryData(postsQueries.infinite().queryKey, (old) =>
        prependPost(old, newPost),
      );
    } catch (err) {
      console.error('Failed to add post to feed:', err);
      add({ message: t('post.addError'), type: 'error' });
    }
  };

  const ref = useIntersectionObserver({ onIntersect: loadPosts });

  if (isPending && !posts.length) {
    return <Loader />;
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <>
      <CreatePost onAdd={addPost} />
      <div className="posts-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
        {isFetchingNextPage && <Loader isBlock={false} />}
      </div>
    </>
  );
};
