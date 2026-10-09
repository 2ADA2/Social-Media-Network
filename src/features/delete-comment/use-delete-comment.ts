import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentRequest } from './delete-comment-api';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';
import { useTranslation } from 'react-i18next';

interface DeleteCommentVariables {
  commentId: number;
  postId: number;
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { add } = useNotifications();
  const { t } = useTranslation('main');

  return useMutation({
    mutationFn: ({ commentId }: DeleteCommentVariables) =>
      deleteCommentRequest(commentId),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      add({ message: t('comment.deleteSuccess') });
    },
    onError: () => {
      add({ message: t('comment.deleteError'), type: 'error' });
    },
  });
};
