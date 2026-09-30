import { useQuery } from '@tanstack/react-query';
import { postsQueries } from '@/features/post-feed/posts-query';

export const usePosts = (limit = 20, offset = 0) => {
  return useQuery(postsQueries.list(limit, offset));
};
