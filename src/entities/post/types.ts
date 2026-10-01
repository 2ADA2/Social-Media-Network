export interface PostAuthor {
  id: number;
  username: string;
  firstName: string | null;
  secondName: string | null;
  profileImage: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  authorId: number;
  likesCount: number;
  commentsCount: number;
  creationDate: string;
  modifiedDate: string;
  author: PostAuthor;
}

export interface PostsPage {
  items: Post[];
  total: number;
  limit: number;
  offset: number;
}