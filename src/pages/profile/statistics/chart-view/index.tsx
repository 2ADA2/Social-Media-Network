import './chart-view.css';
import Chart from 'react-apexcharts';
import type { DailyCount } from '@/shared/lib/stats/count-by-day';
import { buildOptions } from "@/pages/profile/statistics/chart-view/options.ts";

interface ChartViewProps {
  likesByDay: DailyCount[];
  commentsByDay: DailyCount[];
  theme: 'light' | 'dark';
}

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
          type="line"
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
