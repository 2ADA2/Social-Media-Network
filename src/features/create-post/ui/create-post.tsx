import { Index } from "@/shared/ui/avatar";
import { useAuth, useUser } from "@/features/auth";
import { Button } from "../../../shared/ui/button";
import "./create-post.css";
import { useCreatePost } from "@/features/create-post/model/useCreatePost.ts";
import { CreatePostModal } from "@/features/create-post/ui/create-post-modal/create-post-modal.tsx";

export const CreatePost = () => {
  const isAuth = useAuth();
  const user = useUser();

  const { isOpen, open, close } = useCreatePost();

  if (!isAuth) {
    return null;
  }

  return (
    <div className='create-post-card'>
      <Index src={ user.avatar } size={ 32 }/>
      <span>What's happening?</span>
      <Button onClick={ open }> Tell everyone </Button>

      <CreatePostModal isOpen={ isOpen } onClose={ close }/>
    </div>
  );
};
