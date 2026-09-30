import "./main.css";
import { MainSidebar } from "@/widgets/main-sidebar";
import { SUGGESTED_COMMUNITIES, SUGGESTED_PEOPLE } from "@/pages/main/data.ts";
import { CreatePost } from "@/features/create-post";
import { useAuth } from "@/features/auth/use-auth.tsx";
import { PostsList } from "@/features/post-feed/posts-list.tsx";

export const MainPage = () => {
  const { isAuth } = useAuth();

  return (
    <div className='main-page'>
      <CreatePost/>

      <div className='posts-container'>
        <PostsList/>
      </div>

      <div className={ 'recommend-sidebars' }>
        { isAuth && (
          <>
            <MainSidebar title='Suggested people' users={ SUGGESTED_PEOPLE }/>
            <MainSidebar title='Communities you might like' users={ SUGGESTED_COMMUNITIES }/>
          </>
        ) }
      </div>
    </div>
  );
};
