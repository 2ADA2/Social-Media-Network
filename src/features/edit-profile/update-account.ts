import { apiClient } from '@/shared/api/api-client';
import type { User } from '@/entities/user';

export interface UpdateAccountParams {
  currentPassword: string;
  email?: string;
  password?: string;
}

export interface UpdateAccountResponse {
  message: string;
  user: User;
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
}

export const updateAccountRequest = async (
  params: UpdateAccountParams,
): Promise<UpdateAccountResponse> => {
  const { data } = await apiClient.put<UpdateAccountResponse>(
    '/api/account',
    params,
  );
  return data;
};
