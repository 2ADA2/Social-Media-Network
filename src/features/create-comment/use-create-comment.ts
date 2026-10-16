import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentApi } from '@/features/create-comment/create-comment-api.ts';
import type { PostsPage } from '@/entities/post/types.ts';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommentApi,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', params.postId],
      });

      queryClient.setQueriesData<PostsPage>({ queryKey: ['posts'] }, (old) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.map((post) =>
            post.id === params.postId
              ? { ...post, commentsCount: post.commentsCount + 1 }
              : post,
          ),
        };
      });
    },
  });
};
