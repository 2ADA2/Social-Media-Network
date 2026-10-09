import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAccountRequest } from './update-account';
import { useAppDispatch } from '@/app/store/hooks';
import { setCredentials, setUser } from '@/entities/user/model/user-slice';

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: updateAccountRequest,
    onSuccess: (data) => {
      if (data.token && data.refreshToken) {
        localStorage.setItem('token', data.token);
        dispatch(setCredentials({ user: data.user, token: data.token }));
      } else {
        dispatch(setUser(data.user));
        queryClient.setQueryData(['me'], data.user);
      }
    },
  });
};
