import './chart-view.css';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { DailyCount } from '@/shared/lib/stats/count-by-day';

interface ChartViewProps {
  likesByDay: DailyCount[];
  commentsByDay: DailyCount[];
  theme: 'light' | 'dark';
}

const buildOptions = (
  categories: string[],
  theme: 'light' | 'dark',
): ApexOptions => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    background: 'transparent',
  },
  colors: ["var(--chart-primary)"],
  plotOptions: {
    bar: {
      columnWidth: '80%',
      borderRadius: 4,
    },
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: 'var(--chart-primary)',
  },
  xaxis: {
    categories,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: 'var(--color-muted)',
      },
    },
  },
  yaxis: {
    tickAmount: 5,
    min: 0,
    max: (maxValue) => {
      return Math.max(10, maxValue * 1.5);
    },
    labels: {
      formatter: function (val) {
        return val.toFixed(0);
      },
      style: {
        colors: 'var(--color-muted)',
      },
    },
  },
  dataLabels: { enabled: false },
  theme: { mode: theme },
});

export const ChartView = ({
                            likesByDay,
                            commentsByDay,
                            theme,
                          }: ChartViewProps) => {
  const likesSeries = [
    { name: 'Likes', data: likesByDay.map((d) => d.count) },
  ];

  const commentsSeries = [
    { name: 'Comments', data: commentsByDay.map((d) => d.count) },
  ];

  return (
    <div className="stats-container">
      <div className="stats-chart">
        <h2 className="stats-heading">Likes</h2>
        <Chart
          options={ buildOptions(likesByDay.map((d) => d.date), theme) }
          series={ likesSeries }
          type="bar"
          width='90%'
          height='80%'
          className="chart"
        />
      </div>

      <div className="stats-chart">
        <h2 className="chart-heading">Comments</h2>
        <Chart
          options={ buildOptions(commentsByDay.map((d) => d.date), theme) }
          series={ commentsSeries }
          type="bar"
          width='90%'
          height='80%'
          className="chart"
        />
      </div>
    </div>
  );
};
