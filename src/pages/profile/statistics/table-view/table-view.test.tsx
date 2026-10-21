import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { TableView } from '.';

const likesByDay = [
  { date: '2024-01-01', count: 5 },
  { date: '2024-01-02', count: 0 },
  { date: '2024-01-03', count: 3 },
];

const commentsByDay = [
  { date: '2024-01-01', count: 2 },
  { date: '2024-01-02', count: 0 },
  { date: '2024-01-03', count: 7 },
];

describe('TableView', () => {
  test('renders both stats blocks with headings', async () => {
    const screen = await render(
      <TableView likesByDay={likesByDay} commentsByDay={commentsByDay} />,
    );

    await expect
      .element(screen.getByRole('heading', { name: 'stats.likes' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('heading', { name: 'stats.comments' }))
      .toBeVisible();
  });

  test('renders likes rows with counts and dashes for zero', async () => {
    const screen = await render(
      <TableView likesByDay={likesByDay} commentsByDay={commentsByDay} />,
    );

    const tables = screen.getByRole('table');
    const likesTable = tables.first();

    await expect.element(likesTable.getByText('2024-01-01')).toBeVisible();
    await expect.element(likesTable.getByText('5')).toBeVisible();
    await expect.element(likesTable.getByText('-')).toBeVisible();
    await expect.element(likesTable.getByText('3')).toBeVisible();
  });

  test('renders comments rows', async () => {
    const screen = await render(
      <TableView likesByDay={likesByDay} commentsByDay={commentsByDay} />,
    );

    const commentsTable = screen.getByRole('table').nth(1);

    await expect.element(commentsTable.getByText('2024-01-03')).toBeVisible();
    await expect.element(commentsTable.getByText('7')).toBeVisible();
  });

  test('renders "-" for zero counts in both tables', async () => {
    const screen = await render(
      <TableView
        likesByDay={[{ date: '2024-01-01', count: 0 }]}
        commentsByDay={[{ date: '2024-01-01', count: 0 }]}
      />,
    );

    const dashes = screen.getByText('-');
    await expect.element(dashes.first()).toBeVisible();
    await expect.element(dashes.nth(1)).toBeVisible();
  });

  test('renders empty tables when arrays are empty', async () => {
    const screen = await render(
      <TableView likesByDay={[]} commentsByDay={[]} />,
    );

    const tables = screen.getByRole('table');
    await expect.element(tables.first()).toBeVisible();
    await expect.element(tables.nth(1)).toBeVisible();
  });
});
