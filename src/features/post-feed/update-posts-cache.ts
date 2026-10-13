import type { PostsPage } from '@/entities/post/types';
import type { LikeStatus } from '@/features/like-post/like-post-api';

export const updatePostsCache = (
  old: PostsPage | undefined,
  data: LikeStatus,
  currentUserId: string | undefined,
): PostsPage | undefined => {
  if (!old || !currentUserId) return old;

  const userId = Number(currentUserId);

  const isLiked = data.status === 'liked' || data.status === 'already_liked';

  return {
    ...old,
    items: old.items.map((post) => {
      if (post.id !== data.postId) return post;

      let likedByUsers = post.likedByUsers;

      if (isLiked) {
        const alreadyInList = likedByUsers.some((u) => u.id === userId);

        if (!alreadyInList) {
          likedByUsers = [...likedByUsers, { id: userId }];
        }
      } else {
        likedByUsers = likedByUsers.filter((u) => u.id !== userId);
      }

      return {
        ...post,
        likesCount: data.newLikesCount,
        likedByUsers,
      };
    }),
  };
};
