import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import "./create-post.css";
import { useCreatePost } from "@/features/create-post/use-create-post.ts";
import { CreatePostModal } from "@/features/create-post/create-post-modal/create-post-modal.tsx";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { useUser } from "@/entities/user/model/use-user.tsx";

export const CreatePost = () => {
  const isAuth = useAuth();
  const user = useUser();

  const { isOpen, open, close } = useCreatePost();

  if (!isAuth) {
    return null;
  }

  return (
    <div className='create-post-card'>
      <Avatar src={ user.avatar } size={ 32 }/>
      <span>What's happening?</span>
      <Button onClick={ open }> Tell everyone </Button>

      <CreatePostModal isOpen={ isOpen } onClose={ close }/>
    </div>
  );
};
