import type { Community } from "@/entities/community";
import type { User } from "@/entities/user";

export const POST_DATA1 = {
  title: "post title",
  author: "Rami Malek",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmhXSLQ8UtzfFDL9cV9JOE1bZaYOMWf0f_CYjm_XXJw&s=10",
  date: "2 min ago",
  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR52yaj6lwHl6JhTeB4ttCpA7JqlwsfCv0-heH7FOmiKg&s=10",
  description: "MR ROBOT",
  likes: 1000,
  comments: ["WOW that's great", "Not bat", "THIS GUY IS A GOAT!!!"],
};
export const POST_DATA2 = {
  title: "Windows 10 is amazing",
  author: "Rami Malek",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmhXSLQ8UtzfFDL9cV9JOE1bZaYOMWf0f_CYjm_XXJw&s=10",
  date: "2 days ago",
  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3Wloo50DSggkEFdOmdZ32wDaBtDCjQXLb5i6_d-ZUQ&s=10",
  description: "WOW that's photo is perfect! I really like it...",
  likes: 56,
  comments: ["WOW that's great", "Not bat", "THIS GUY IS A GOAT!!!"],
};

export const POST_DATA3 = {
  title: "Tinkoff WIKI",
  author: "Rami Malek",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmhXSLQ8UtzfFDL9cV9JOE1bZaYOMWf0f_CYjm_XXJw&s=10",
  date: "10 hours ago",
  description: "Tinkov is the founder of a network of shops of household appliances Technoshock, frozen food factories Daria, brewing companies and network of Tinkoff restaurants",
  likes: 1324,
  comments: ["WOW that's great", "Not bat", "THIS GUY IS A GOAT!!!"],
};
export const SUGGESTED_PEOPLE = [
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJM2t5u7U9PUAcGmq-SIETB4nYN1mFPoSnny1Nb_PZQw&s=10",
    id: "1",
    name: "Helena",
    surname: "Hills",
    username: "@helenahills",
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJM2t5u7U9PUAcGmq-SIETB4nYN1mFPoSnny1Nb_PZQw&s=10",
    id: "2",
    name: "Charles",
    username: "@charles",
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJM2t5u7U9PUAcGmq-SIETB4nYN1mFPoSnny1Nb_PZQw&s=10",
    id: "3",
    name: "Oscar",
    surname: "Davis",
    username: "@oscardavis",
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJM2t5u7U9PUAcGmq-SIETB4nYN1mFPoSnny1Nb_PZQw&s=10",
    id: "4",
    name: "Daniel",
    surname: "Jay Park",
    username: "@danielj",
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJM2t5u7U9PUAcGmq-SIETB4nYN1mFPoSnny1Nb_PZQw&s=10",
    id: "5",
    name: "Carlo",
    surname: "Rojas",
    username: "@carlorojas",
  },
] as User[];

export const SUGGESTED_COMMUNITIES: Community[] = [
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQ_YY2cmQy1kJ2i7f6c_XQCBy8H-IRycTte9qrXc3bQ&s=10",
    id: "c1",
    name: "Design Enthusiasts",
    members: "13.2k members",
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQ_YY2cmQy1kJ2i7f6c_XQCBy8H-IRycTte9qrXc3bQ&s=10",
    id: "c2",
    name: "Photographers of SF",
    members: "2k members",
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQ_YY2cmQy1kJ2i7f6c_XQCBy8H-IRycTte9qrXc3bQ&s=10",
    id: "c3",
    name: "Marina crew",
    members: "125 members",
  },
];
export const POSTS = [POST_DATA1, POST_DATA2, POST_DATA3];

