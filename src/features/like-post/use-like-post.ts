import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dislikePost, likePost } from '@/features/like-post/like-post-api';
import { useUser } from '@/entities/user/model/use-user.tsx';
import type { PostsPage } from '@/entities/post/types.ts';
import { updatePostsCache } from '@/features/post-feed/update-posts-cache.ts';

interface LikeVariables {
  postId: number;
  liked: boolean;
}

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ postId, liked }: LikeVariables) =>
      liked ? dislikePost(postId) : likePost(postId),
    onSuccess: (data) => {
      queryClient.setQueriesData<PostsPage>({ queryKey: ['posts'] }, (old) =>
        updatePostsCache(old, data, user?.id),
      );
    },
  });
};
