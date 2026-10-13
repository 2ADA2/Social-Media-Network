import { apiClient } from '@/shared/api/api-client';
import { mapUser, type User, type UserResponse } from '@/entities/user';

export interface UpdateProfileParams {
  username?: string;
  firstName?: string;
  secondName?: string;
  description?: string;
  profileImage?: string;
}

export const updateProfileRequest = async (
  params: UpdateProfileParams,
): Promise<User> => {
  const { data } = await apiClient.put<UserResponse>('/api/profile', params);
  return mapUser(data);
};
