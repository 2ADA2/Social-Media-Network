import "./main.css";
import { MainSidebar } from "@/widgets/main-sidebar";
import { SUGGESTED_COMMUNITIES, SUGGESTED_PEOPLE } from "@/pages/main/data.ts";
import { CreatePost } from "@/features/create-post";
import { useAuth } from "@/features/auth/use-auth.tsx";
import { PostsList } from "@/features/post-feed/posts-list.tsx";
import { Notifications } from "@/widgets/notifications";
import { useContext, useState } from "react";
import { NotificationsContext } from "@/app/providers/notifications-context/context.ts";

export const MainPage = () => {
  const { isAuth } = useAuth();
  const [counter, setCounter] = useState(1);
  const context = useContext(NotificationsContext);

  const addNote = () => {
    context?.addNotification({ message: "message " + counter, title: "title" + counter });
    setCounter(prev => prev + 1);
  };

  return (
    <div className='main-page'>
      <button onClick={ addNote }>Create note</button>
      <Notifications/>
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
