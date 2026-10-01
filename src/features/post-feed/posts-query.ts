import { queryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@/shared/api/graphql-client';
import type { Post, PostsPage } from '@/entities/post/types';
import { gql } from 'graphql-request';

const ALL_POSTS_QUERY = gql`
  query AllPosts($limit: Int, $offset: Int) {
    allPosts(limit: $limit, offset: $offset) {
      id
      title
      content
      image
      authorId
      likesCount
      commentsCount
      creationDate
      modifiedDate
      author {
        id
        username
        firstName
        secondName
        profileImage
      }
    }
  }
`;

const POSTS_TOTAL_QUERY = gql`
  query PostsTotal {
    postsTotal
  }
`;

interface AllPostsResponse {
  allPosts: Post[];
}

interface PostsTotalResponse {
  postsTotal: number;
}

const fetchPosts = async (limit = 20, offset = 0): Promise<PostsPage> => {
  const [postsData, totalData] = await Promise.all([
    graphqlClient.request<AllPostsResponse>(ALL_POSTS_QUERY, { limit, offset }),
    graphqlClient.request<PostsTotalResponse>(POSTS_TOTAL_QUERY),
  ]);

  return {
    items: postsData.allPosts,
    total: totalData.postsTotal,
    limit,
    offset,
  };
};

export const postsQueries = {
  all: () =>
    queryOptions({
      queryKey: ['posts'],
      queryFn: () => fetchPosts(),
      staleTime: 5 * 60 * 1000,
    }),

  list: (limit = 20, offset = 0) =>
    queryOptions({
      queryKey: ['posts', { limit, offset }],
      queryFn: () => fetchPosts(limit, offset),
      staleTime: 5 * 60 * 1000,
    }),
};
