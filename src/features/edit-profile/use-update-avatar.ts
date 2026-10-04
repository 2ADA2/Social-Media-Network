import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '@/app/store/hooks';
import { setUser } from '@/entities/user/model/user-slice';
import { uploadAvatar } from "@/features/edit-profile/upload-avatar.ts";
import { updateProfileRequest } from "@/features/edit-profile/update-profile-api.ts";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (file: File) => {
      const url = await uploadAvatar(file);
      return updateProfileRequest({ profileImage: url });
    },
    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.setQueryData(['me'], user);
    },
  });
};
