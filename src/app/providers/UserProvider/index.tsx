import React, { useState } from "react";
import { type User, UserContext } from "@/entities/user";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user] = useState<User | null>(null);
  const [isAuth] = useState<boolean>(false);

  return (
    <UserContext.Provider value={ { isAuth, user } }>
      { children }
    </UserContext.Provider>
  );
};
