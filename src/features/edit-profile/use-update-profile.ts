import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileRequest } from "@/features/edit-profile/update-profile-api.ts";
import { useAppDispatch } from '@/app/store/hooks';
import { setUser } from '@/entities/user/model/user-slice';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.setQueryData(['me'], user);
    },
  });
};
