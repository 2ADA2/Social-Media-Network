import type { InfiniteData } from '@tanstack/react-query';
import type { PostsPage, Post } from '@/entities/post/types';
import type { LikeStatus } from '@/features/like-post/like-post-api';

type PostsInfiniteData = InfiniteData<PostsPage>;

export const prependPost = (
  old: PostsInfiniteData | undefined,
  newPost: Post,
): PostsInfiniteData | undefined => {
  if (!old) return old;

  const [firstPage, ...rest] = old.pages;
  if (!firstPage) return old;

  const alreadyExists = firstPage.items.some((p) => p.id === newPost.id);
  if (alreadyExists) return old;

  return {
    ...old,
    pages: [{ ...firstPage, items: [newPost, ...firstPage.items] }, ...rest],
  };
};

export const removePost = (
  old: PostsInfiniteData | undefined,
  postId: number,
): PostsInfiniteData | undefined => {
  if (!old) return old;

  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      items: page.items.filter((p) => p.id !== postId),
    })),
  };
};

export const updatePostLikes = (
  old: PostsInfiniteData | undefined,
  data: LikeStatus,
  currentUserId: string | undefined,
): PostsInfiniteData | undefined => {
  if (!old || !currentUserId) return old;

  const userId = Number(currentUserId);
  const isLiked = data.status === 'liked' || data.status === 'already_liked';

  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      items: page.items.map((post) => {
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
    })),
  };
};

export const updatePostCommentsCount = (
  old: PostsInfiniteData | undefined,
  postId: number,
  delta: number,
): PostsInfiniteData | undefined => {
  if (!old) return old;

  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      items: page.items.map((post) =>
        post.id === postId
          ? { ...post, commentsCount: Math.max(0, post.commentsCount + delta) }
          : post,
      ),
    })),
  };
};
