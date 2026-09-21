import "./main.css";
import { Post } from "@/entities/post";
import { CreatePost } from "@/features/create-post/ui/create-post.tsx";
import { MainSidebar } from "@/widgets/main-sidebar";
import { POSTS, SUGGESTED_COMMUNITIES, SUGGESTED_PEOPLE } from "@/pages/main/ui/data.ts";
import { useAuth } from "@/features/auth";




export const MainPage = () => {
  const isAuth = useAuth();

  return (
    <div className='main-page'>
      <CreatePost/>

      <div className='posts-container'>
        { POSTS.map((post, i) => <Post key={ i } { ...post }/>) }
      </div>

      <div className={'recommend-sidebars'}>
        {isAuth && (
          <>
            <MainSidebar title='Suggested people' users={ SUGGESTED_PEOPLE }/>
            <MainSidebar title='Communities you might like' users={SUGGESTED_COMMUNITIES}/>
          </>
        )}
      </div>
    </div>
  );
};
