import { useQuery } from '@tanstack/react-query';
import { type PostsParams, postsQueries } from "@/features/post-feed/posts-query.ts";

export const usePosts = (params?: PostsParams) => {
  return useQuery(postsQueries.posts(params ?? {}));
};
