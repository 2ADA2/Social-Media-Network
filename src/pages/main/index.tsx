import "./main.css";
import { MainSidebar } from "@/widgets/main-sidebar";
import { CreatePost } from "@/features/create-post";
import { useAuth } from "@/features/auth/use-auth.tsx";
import { PostsList } from "@/features/post-feed/posts-list.tsx";

export const MainPage = () => {
  const { isAuth } = useAuth();

  return (
    <div className='main-page'>
      <CreatePost/>
      <PostsList/>

      <div className={ 'recommend-sidebars' }>
        { isAuth && <MainSidebar/>}
      </div>
    </div>
  );
};
