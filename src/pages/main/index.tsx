import "./main.css";
import { MainSidebar } from "@/widgets/main-sidebar";
import { SUGGESTED_COMMUNITIES, SUGGESTED_PEOPLE } from "@/pages/main/data.ts";
import { CreatePost } from "@/features/create-post";
import { useAuth } from "@/features/auth/use-auth.tsx";
import { PostsList } from "@/features/post-feed/posts-list.tsx";
import { useNotifications } from "@/app/providers/notifications-context/useNotifications.ts";

export const MainPage = () => {
  const { isAuth } = useAuth();
  const { add } = useNotifications();

  const addNote = () => {
    add({
      type: "error",
      message: "Time: " + String(new Date().toLocaleTimeString()) + "And a very very long long long text that wants some extra space"
    });
  };

  return (
    <div className='main-page'>
      <button onClick={ addNote }>Show time</button>

      <CreatePost/>

      <PostsList/>

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
