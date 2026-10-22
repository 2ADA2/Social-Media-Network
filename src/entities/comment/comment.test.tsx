import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { CommentInterface, PublicUser } from './types';
import { render } from 'vitest-browser-react';
import { Comment } from '.';
import { authUser } from '@/test/mock-hooks';
import { useDeleteComment } from '@/features/delete-comment/use-delete-comment';
import { useUser } from '../user/model/use-user';
import { page, userEvent } from 'vitest/browser';

vi.mock('@/features/delete-comment/use-delete-comment.ts', () => ({
  useDeleteComment: vi.fn(),
}));

vi.mock('@/entities/user/model/use-user.tsx', () => ({
  useUser: vi.fn(),
}));

export const mockPublicUser: PublicUser = {
  id: 2,
  username: 'alicesmith',
  firstName: 'Alice',
  secondName: 'Smith',
  description: 'Frontend developer',
  bio: 'Loves React and TypeScript',
  profileImage: 'https://example.com/avatar.png',
  creationDate: '2026-01-01T12:00:00Z',
};

export const mockComment: CommentInterface = {
  id: 2,
  text: 'Great post!',
  authorId: 2,
  postId: 10,
  creationDate: '2026-01-01T12:00:00Z',
  modifiedDate: '2026-01-01T12:00:00Z',
  author: mockPublicUser,
};

describe('Comment component', () => {
  let mutateFn: () => void;

  beforeEach(() => {
    mutateFn = vi.fn();

    vi.mocked(useDeleteComment).mockReturnValue({
      mutate: mutateFn,
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteComment>);
    vi.mocked(useUser).mockReturnValue(authUser);
  });

  test('renders comment text', async () => {
    const screen = await render(<Comment {...mockComment} />);

    await expect(screen.getByText('Great post!')).toBeVisible();
  });

  test('correctly renders comment with empty author', async () => {
    const screen = await render(
      <Comment {...mockComment} author={{} as PublicUser} />,
    );

    await expect(screen.getByText('Great post!')).toBeVisible();
    await expect(
      screen.getByText('null', { exact: false }),
    ).not.toBeInTheDocument();
  });

  test('doesnt render delete comment button if user is not author', async () => {
    const screen = await render(<Comment {...mockComment} />);

    await expect(
      screen.getByRole('button', { name: 'comment.delete' }),
    ).not.toBeInTheDocument();
  });

  test('shows delete comment button if user is author', async () => {
    const myComment = {
      ...mockComment,
      authorId: 1,
      author: { ...mockPublicUser, id: 1 },
    };

    const screen = await render(<Comment {...myComment} />);
    await page.viewport(320, 700);
    await expect(
      screen.getByRole('button', { name: 'comment.delete' }),
    ).toBeInTheDocument();
  });

  test('Deletes comment on delete button click', async () => {
    const user = userEvent.setup();
    const myComment = {
      ...mockComment,
      authorId: 1,
      author: { ...mockPublicUser, id: 1 },
    };

    const screen = await render(<Comment {...myComment} />);
    await page.viewport(320, 700);
    await user.click(screen.getByRole('button', { name: 'comment.delete' }));

    expect(mutateFn).toHaveBeenCalled();
  });
});
