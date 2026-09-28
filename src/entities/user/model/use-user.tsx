import { useContext } from 'react';
import { UserContext } from '@/entities/user';

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context?.user) {
    throw new Error('Cannot get userContext');
  }

  return context.user;
};
