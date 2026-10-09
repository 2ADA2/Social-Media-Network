import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentApi } from '@/features/create-comment/create-comment-api.ts';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommentApi,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', params.postId],
      });
    },
  });
};
