import { createContext } from 'react';
import type { User } from './types';



export interface UserContextInterface {
  user: User | null;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

export const UserContext = createContext<UserContextInterface | undefined>(undefined);
