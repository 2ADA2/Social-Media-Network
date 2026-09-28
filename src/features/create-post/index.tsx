import { Card, Text, StyledButton, StyledAvatar } from './create-post.styles';
import { useCreatePost } from "@/features/create-post/use-create-post.ts";
import { CreatePostModal } from "@/features/create-post/create-post-modal/create-post-modal.tsx";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { useUser } from "@/entities/user/model/use-user.tsx";

export const CreatePost = () => {
  const { isAuth } = useAuth();
  const { user } = useUser();

  const { isOpen, open, close } = useCreatePost();

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
