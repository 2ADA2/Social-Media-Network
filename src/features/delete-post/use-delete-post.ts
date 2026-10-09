import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { deletePostRequest } from './delete-post-api.ts';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';

export const useDeletePost = () => {
  const { add } = useNotifications();
  const { t } = useTranslation('main');

  return useMutation({
    mutationFn: (postId: number) => deletePostRequest(postId),
    onSuccess: () => {
      add({ message: t('post.deleteSuccess') });
    },
    onError: () => {
      add({ message: t('post.deleteError'), type: 'error' });
    },
  });
};
