import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import ChartView from '.';

const mockBuildOptions = vi.fn();

vi.mock('@/pages/profile/statistics/chart-view/options', () => ({
  buildOptions: (...args: unknown[]) => mockBuildOptions(...args),
}));

vi.mock('i18next', () => ({
  default: { language: 'en' },
}));

vi.mock('react-apexcharts', () => ({
  default: (props: { options: unknown; series: unknown; type: string }) => (
    <div
      data-testid="chart"
      data-type={props.type}
      data-series={JSON.stringify(props.series)}
    />
  ),
}));

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

describe('ChartView', () => {
  beforeEach(() => {
    mockBuildOptions.mockReset();
    mockBuildOptions.mockImplementation((...args) => args);
  });

  test('renders both chart blocks with headings', async () => {
    const screen = await render(
      <ChartView
        likesByDay={likesByDay}
        commentsByDay={commentsByDay}
        theme="light"
      />,
    );

    await expect
      .element(screen.getByRole('heading', { name: 'stats.likes' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('heading', { name: 'stats.comments' }))
      .toBeVisible();
  });

  test('passes correct series to likes and comments charts', async () => {
    const { container } = await render(
      <ChartView
        likesByDay={likesByDay}
        commentsByDay={commentsByDay}
        theme="light"
      />,
    );

    const charts = container.querySelectorAll('[data-testid="chart"]');
    expect(charts).toHaveLength(2);

    const likesSeries = JSON.parse(
      charts[0].getAttribute('data-series') ?? '[]',
    );
    expect(likesSeries).toEqual([{ name: 'stats.likes', data: [5, 0, 3] }]);

    const commentsSeries = JSON.parse(
      charts[1].getAttribute('data-series') ?? '[]',
    );
    expect(commentsSeries).toEqual([
      { name: 'stats.comments', data: [2, 0, 7] },
    ]);
  });

  test('passes correct chart type', async () => {
    const { container } = await render(
      <ChartView
        likesByDay={likesByDay}
        commentsByDay={commentsByDay}
        theme="light"
      />,
    );

    const charts = container.querySelectorAll('[data-testid="chart"]');
    expect(charts[0].getAttribute('data-type')).toBe('line');
    expect(charts[1].getAttribute('data-type')).toBe('bar');
  });

  test('calls buildOptions with dates, theme and chart ids', async () => {
    await render(
      <ChartView
        likesByDay={likesByDay}
        commentsByDay={commentsByDay}
        theme="dark"
      />,
    );

    expect(mockBuildOptions).toHaveBeenCalledWith(
      ['2024-01-01', '2024-01-02', '2024-01-03'],
      'dark',
      'likes-chart',
      'line',
      'en',
    );
    expect(mockBuildOptions).toHaveBeenCalledWith(
      ['2024-01-01', '2024-01-02', '2024-01-03'],
      'dark',
      'comments-chart',
      'bar',
      'en',
    );
  });

  test('renders empty chart series when data arrays are empty', async () => {
    const { container } = await render(
      <ChartView likesByDay={[]} commentsByDay={[]} theme="light" />,
    );

    const charts = container.querySelectorAll('[data-testid="chart"]');
    const likesSeries = JSON.parse(
      charts[0].getAttribute('data-series') ?? '[]',
    );
    expect(likesSeries).toEqual([{ name: 'stats.likes', data: [] }]);
  });
});
