import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentRequest } from "@/features/create-comment/create-comment-request.ts";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommentRequest,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', params.postId],
      });
    },
  });
};
