import "./main.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Post } from "@/entities/post";

const POST_DATA = {
  title: "post title",
  author: "Rami malek",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmhXSLQ8UtzfFDL9cV9JOE1bZaYOMWf0f_CYjm_XXJw&s=10",
  date: "2 mins ago",
  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR52yaj6lwHl6JhTeB4ttCpA7JqlwsfCv0-heH7FOmiKg&s=10",
  description: "MR ROBOT",
  likes: 1000,
  comments: ["WOW that's great", "Not bat", "THIS GUY IS A GOAT!!!"],
};

export const MainPage = () => {
  return (
    <>
      <Header/>
      <main className="main">
        <Post {...POST_DATA}/>
      </main>
      <Footer/>
    </>
  );
};
