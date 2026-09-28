import type { User, UserResponse } from '@/entities/user';

export const getMe = async (token: string): Promise<User> => {
  const res = await fetch('/api/me', {
    headers: { Authorization: `Bearer ${ token }` },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  const userResponse: UserResponse = await res.json();

  return {
    id: String(userResponse.id),
    username: userResponse.username,
    name: userResponse.firstName ?? '',
    surname: userResponse.secondName ?? '',
    email: userResponse.email ?? '',
    avatar: userResponse.profileImage ?? '',
    description: userResponse.description ?? '',
  };
};
