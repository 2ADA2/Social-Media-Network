import { useContext } from 'react';
import { UserContext } from '@/entities/user';

export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Cannot get userContext');
  }

  return context.isAuth;
};
