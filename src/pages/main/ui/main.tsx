import "./main.css";
import { Post } from "@/entities/post";
import { CreatePost } from "@/features/create-post/ui/create-post.tsx";

const POST_DATA1 = {
  title: "post title",
  author: "Rami Malek",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmhXSLQ8UtzfFDL9cV9JOE1bZaYOMWf0f_CYjm_XXJw&s=10",
  date: "2 min ago",
  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR52yaj6lwHl6JhTeB4ttCpA7JqlwsfCv0-heH7FOmiKg&s=10",
  description: "MR ROBOT",
  likes: 1000,
  comments: ["WOW that's great", "Not bat", "THIS GUY IS A GOAT!!!"],
};
const POST_DATA2 = {
  title: "Windows 10 is amazing",
  author: "Rami Malek",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmhXSLQ8UtzfFDL9cV9JOE1bZaYOMWf0f_CYjm_XXJw&s=10",
  date: "2 days ago",
  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3Wloo50DSggkEFdOmdZ32wDaBtDCjQXLb5i6_d-ZUQ&s=10",
  description: "WOW that's photo is perfect! I really like it...",
  likes: 56,
  comments: ["WOW that's great", "Not bat", "THIS GUY IS A GOAT!!!"],
};

const POST_DATA3 = {
  title: "Tinkoff WIKI",
  author: "Rami Malek",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmhXSLQ8UtzfFDL9cV9JOE1bZaYOMWf0f_CYjm_XXJw&s=10",
  date: "10 hours ago",
  description: "Tinkov is the founder of a network of shops of household appliances Technoshock, frozen food factories Daria, brewing companies and network of Tinkoff restaurants",
  likes: 1324,
  comments: ["WOW that's great", "Not bat", "THIS GUY IS A GOAT!!!"],
};

const POSTS = [POST_DATA1, POST_DATA2, POST_DATA3];

export const MainPage = () => {
  return (
    <div className='main-page'>
      <CreatePost/>

      <div className='posts-container'>
        { POSTS.map((post, i) => <Post key={ i } { ...post }/>) }
      </div>
    </div>
  );
};
