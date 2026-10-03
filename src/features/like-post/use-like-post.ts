import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dislikePost, likePost } from '@/features/like-post/like-post-api';
import type { PostsPage } from '@/entities/post/types';
import { updatePostsCache } from '@/features/like-post/update-posts-cache';
import { useAppSelector } from "@/app/store/hooks.ts";
import { selectUserId } from "@/entities/user/model/selectors.ts";

interface LikeVariables {
  postId: number;
  liked: boolean;
}

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const userId = Number(useAppSelector(selectUserId)) || -1;

  return useMutation({
    mutationFn: ({ postId, liked }: LikeVariables) =>
      liked ? dislikePost(postId) : likePost(postId),
    onSuccess: (data) => {
      queryClient.setQueriesData<PostsPage>(
        { queryKey: ['posts'] },
        (old) => updatePostsCache(old, data, userId),
      );
    },
  });
};
