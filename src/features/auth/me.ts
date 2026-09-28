import { apiClient } from '@/shared/api/api-client';
import type { User, UserResponse } from '@/entities/user';

export const getMe = async (): Promise<User> => {
  const { data } = await apiClient.get<UserResponse>('/api/me');

  return {
    id: String(data.id),
    username: data.username,
    name: data.firstName ?? '',
    surname: data.secondName ?? '',
    email: data.email ?? '',
    avatar: data.profileImage ?? '',
    description: data.description ?? '',
  };
};
