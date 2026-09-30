import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient('/api/graphql', {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  requestMiddleware: (request) => {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return request;
  },
});
