import React, { useState } from "react";
import { type User, UserContext } from "@/entities/user";

const USER_DATA: User = {
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnoYbJQK0m8Se7zRczq-j0L6JAb5074pVZjfoTFd0wNQ&s=10",
  name: "Rami",
  surname: "Malek",
  id: "35qb375r94",
  email: "rami-malek@gmail.com",
  username: "ramiMalek228",
  description:"Rami Said Malek (born May 12, 1981) is an American actor best known for his breakthrough roles as hacker Elliot Alderson in the thriller series Mr. Robot",
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user] = useState<User | null>(USER_DATA);
  const [isAuth] = useState<boolean>(true);

  return (
    <UserContext.Provider value={ { isAuth, user } }>
      { children }
    </UserContext.Provider>
  );
};
