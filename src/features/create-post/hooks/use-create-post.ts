import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@/features/create-post/api/upload-image.ts";
import { createPostRequest } from "@/features/create-post/api/create-post.ts";

export interface UseCreatePostParams {
  title: string;
  content: string;
  file: File | null;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, content, file }: UseCreatePostParams) => {
      let imageUrl;

      if (file) {
        imageUrl = await uploadImage(file);
      }

      return createPostRequest({ title, content, image: imageUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
