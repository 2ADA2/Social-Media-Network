import "./main.css";
import { Post } from "@/entities/post";
import { CreatePost } from "@/features/create-post/ui/create-post.tsx";
import { MainSidebar } from "@/widgets/main-sidebar";
import { POSTS, SUGGESTED_COMMUNITIES, SUGGESTED_PEOPLE } from "@/pages/main/ui/data.ts";




export const MainPage = () => {
  return (
    <div className='main-page'>
      <CreatePost/>

      <div className='posts-container'>
        { POSTS.map((post, i) => <Post key={ i } { ...post }/>) }
      </div>

      <div className={'recommend-sidebars'}>
      <MainSidebar title='Suggested people' users={SUGGESTED_PEOPLE}/>
      <MainSidebar title='Communities you might like' users={SUGGESTED_COMMUNITIES}/>
      </div>
    </div>
  );
};
