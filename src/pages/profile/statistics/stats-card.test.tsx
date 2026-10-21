import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { StatsCard } from './stats-card';

describe('StatsCard', () => {
  test('renders title, value and percents', async () => {
    const screen = await render(
      <StatsCard title="stats.likes" value={5} percents={10} />,
    );

    await expect.element(screen.getByText('stats.likes')).toBeVisible();
    await expect.element(screen.getByText('5')).toBeVisible();
    await expect
      .element(screen.getByText('+10% stats.weekOverWeek'))
      .toBeVisible();
  });

  test('renders plus sign for positive percents', async () => {
    const screen = await render(
      <StatsCard title="stats.likes" value={5} percents={10} />,
    );

    await expect
      .element(screen.getByText('+10% stats.weekOverWeek'))
      .toBeVisible();
  });

  test('renders minus sign for negative percents', async () => {
    const screen = await render(
      <StatsCard title="stats.likes" value={5} percents={-10} />,
    );

    await expect
      .element(screen.getByText('-10% stats.weekOverWeek'))
      .toBeVisible();
  });

  test('renders 0 for zero percents', async () => {
    const screen = await render(
      <StatsCard title="stats.likes" value={5} percents={0} />,
    );

    await expect
      .element(screen.getByText('+0% stats.weekOverWeek'))
      .toBeVisible();
  });

  test('renders 0 when value is 0', async () => {
    const screen = await render(
      <StatsCard title="stats.likes" value={0} percents={10} />,
    );

    await expect.element(screen.getByText('0')).toBeVisible();
  });
});
