import { Card, Text, StyledButton, StyledAvatar } from './create-post.styles';
import { useCreatePostModal } from "@/features/create-post/hooks/use-create-post-modal.ts";
import { CreatePostModal } from "@/features/create-post/create-post-modal/create-post-modal.tsx";
import { useAuth } from "@/features/auth/use-auth.tsx";
import { useUser } from "@/entities/user/model/use-user.tsx";

export const CreatePost = () => {
  const { isAuth } = useAuth();
  const { user } = useUser();

  const { isOpen, open, close } = useCreatePostModal();

  if (!isAuth) {
    return null;
  }

  return (
    <Card>
      <StyledAvatar src={user!.avatar} size={32} />
      <Text>What's happening?</Text>
      <StyledButton onClick={open}>Tell everyone</StyledButton>

      <CreatePostModal isOpen={isOpen} onClose={close} />
    </Card>
  );
};
