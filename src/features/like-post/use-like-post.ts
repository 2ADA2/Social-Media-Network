import { useMutation } from '@tanstack/react-query';
import { dislikePost, likePost } from '@/features/like-post/like-post-api';

interface LikeVariables {
  postId: number;
  liked: boolean;
}

export const useLikePost = () => {
  return useMutation({
    mutationFn: ({ postId, liked }: LikeVariables) =>
      liked ? dislikePost(postId) : likePost(postId),
  });
};
