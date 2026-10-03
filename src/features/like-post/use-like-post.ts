import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dislikePost, likePost } from "@/features/like-post/like-post-api.ts";

interface LikeVariables {
  postId: number;
  liked: boolean;
}

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, liked }: LikeVariables) =>
      liked ? dislikePost(postId) : likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
