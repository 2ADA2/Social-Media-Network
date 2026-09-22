import React, { useState } from "react";
import { type User, UserContext } from "@/entities/user";

const USER_DATA: User = {
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnoYbJQK0m8Se7zRczq-j0L6JAb5074pVZjfoTFd0wNQ&s=10",
  username: "@ramimalek1994",
  name: "Rami",
  surname: "Malek",
  id: "35qb375r94",
  email: "rami-malek@gmail.com",
  description: "",
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user] = useState<User | null>(USER_DATA);
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("token"));

  return (
    <UserContext.Provider value={ { isAuth, setIsAuth, user } }>
      { children }
    </UserContext.Provider>
  );
};
