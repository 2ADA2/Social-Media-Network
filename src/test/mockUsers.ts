import type { PublicUser } from '@/entities/comment/types';
import type {
  CommunityResponse,
  SuggestedPeopleResponse,
} from '@/features/sidebar/types';

export const userAlice: PublicUser = {
  id: 2,
  username: 'alicesmith',
  firstName: 'Alice',
  secondName: 'Smith',
  description: 'Frontend developer',
  bio: 'Loves React and TypeScript',
  profileImage: 'https://example.com/avatar.png',
  creationDate: '2026-01-01T12:00:00Z',
};

export const userBob: PublicUser = {
  id: 3,
  username: 'bobkage',
  firstName: 'Bob',
  secondName: 'Kage',
  description: 'Backend developer',
  bio: 'Loves Java and Spring',
  profileImage: 'https://example.com/avatar.png',
  creationDate: '2026-02-01T14:00:00Z',
};

export const suggestedUserAlice: SuggestedPeopleResponse = {
  id: 2,
  username: 'alicesmith',
  firstName: 'Alice',
  secondName: 'Smith',
  description: 'Frontend developer',
  photo: 'https://example.com/avatar.png',
};

export const suggestedUserBob: SuggestedPeopleResponse = {
  id: 3,
  username: 'bobkage',
  firstName: 'Bob',
  secondName: 'Kage',
  description: 'Backend developer',
  photo: 'https://example.com/avatar.png',
};

export const communityReact: CommunityResponse = {
  id: 1,
  title: 'React Developers',
  photo: 'https://example.com/react.png',
  membersCount: 150,
};

export const communityTypeScript: CommunityResponse = {
  id: 2,
  title: 'TypeScript Enthusiasts',
  photo: null,
  membersCount: 320,
};
