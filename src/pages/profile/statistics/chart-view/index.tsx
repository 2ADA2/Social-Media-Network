import './chart-view.css';
import Chart from 'react-apexcharts';
import type { DailyCount } from '@/shared/lib/stats/count-by-day';
import { buildOptions } from "@/pages/profile/statistics/chart-view/options.ts";
import { useMemo } from "react";

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
  const likesSeries = useMemo(() => ([
    { name: 'Likes', data: likesByDay.map((d) => d.count) },
  ]), [likesByDay]);

  const commentsSeries = useMemo(() => ([
    { name: 'Comments', data: commentsByDay.map((d) => d.count) },
  ]), [commentsByDay]);

  const likesOptions = useMemo(() => {
    const categories = likesByDay.map((d) => d.date);
    return buildOptions(categories, theme, "likes-chart", "line");
  }, [likesByDay, theme]);

  const commentsOptions = useMemo(() => {
    const categories = commentsByDay.map((d) => d.date);
    return buildOptions(categories, theme, "comments-chart", "bar");
  }, [commentsByDay, theme]);

  return (
    <div className="stats-container">
      <div className="stats-chart">
        <h2 className="stats-heading">Likes</h2>
        <Chart
          options={ likesOptions }
          series={ likesSeries }
          type="line"
          width='95%'
          height='80%'
          className="chart"
        />
      </div>

      <div className="stats-chart">
        <h2 className="chart-heading">Comments</h2>
        <Chart
          options={ commentsOptions }
          series={ commentsSeries }
          type="bar"
          width='95%'
          height='80%'
          className="chart"
        />
      </div>
    </div>
  );
};
