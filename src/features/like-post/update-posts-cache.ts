import type { PostsPage } from '@/entities/post/types';
import type { LikeStatus } from '@/features/like-post/like-post-api';

export const updatePostsCache = (
  old: PostsPage | undefined,
  data: LikeStatus,
  userId: number,
): PostsPage | undefined => {
  if (!old) {
    return old;
  }

  const isLiked =
    data.status === 'liked' || data.status === 'already_liked';

  return {
    ...old,
    items: old.items.map((post) => {
      if (post.id !== data.postId) {
        return post;
      }

      const alreadyInList = post.likedByUsers.some((u) => u.id === userId);

      let likedByUsers = post.likedByUsers;

      if (isLiked && !alreadyInList) {
        likedByUsers = [...post.likedByUsers, { id: userId }];
      }

      if (!isLiked) {
        likedByUsers = post.likedByUsers.filter((u) => u.id !== userId);
      }

      return {
        ...post,
        likesCount: data.newLikesCount,
        likedByUsers,
      };
    }),
  };
};
