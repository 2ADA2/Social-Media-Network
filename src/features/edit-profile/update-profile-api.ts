import { apiClient } from '@/shared/api/api-client';
import type { User, UserResponse } from '@/entities/user';

export interface UpdateProfileParams {
  username?: string;
  email?: string;
  firstName?: string;
  secondName?: string;
  description?: string;
  profileImage?: string;
}

const mapUser = (data: UserResponse): User => {
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

export const updateProfileRequest = async (
  params: UpdateProfileParams,
): Promise<User> => {
  const { data } = await apiClient.put<UserResponse>('/api/profile', params);
  return mapUser(data);
};
