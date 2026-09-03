import "../global.css";
import { Post } from "./entities/post";

const POST_DATA = {
  title: "Title",
  author: "Author",
  date: "2 min ago",
  imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj02OtMTZTGaWjMNwXnm9b9qSDcbScZTI8oUIwHbQeHw&s",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpytR06h5vlTNbl2m6qezwGkcMy7jcArdz2tP9XzUkQA&s=10",
  description: "A very log description of the post. If you read this you can understand what's happening right now in the world!",
  likes:5,
  comments: 1,
};

function App() {
  return <Post { ...POST_DATA }/>;
}

export default App;
