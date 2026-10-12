import { useTranslation } from 'react-i18next';
import { Card, Text, StyledButton, StyledAvatar } from './create-post.styles';
import { CreatePostModal } from "@/features/create-post/create-post-modal/create-post-modal.tsx";
import { useAuth } from "@/features/auth/use-auth.tsx";
import { useUser } from "@/entities/user/model/use-user.tsx";
import { useModal } from "@/shared/lib/hooks/use-modal/use-modal.ts";

export const CreatePost = () => {
  const { t } = useTranslation('main');
  const { isAuth } = useAuth();
  const { user } = useUser();

  const { isOpen, open, close } = useModal();

  if (!isAuth) {
    return null;
  }

  return (
    <Card>
      <StyledAvatar src={user!.avatar} size={32} />
      <Text>{ t('createPost.placeholder') }</Text>
      <StyledButton onClick={open}>{ t('createPost.submit') }</StyledButton>

      <CreatePostModal isOpen={isOpen} onClose={close} />
    </Card>
  );
};
