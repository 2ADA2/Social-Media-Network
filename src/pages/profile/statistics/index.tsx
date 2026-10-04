import { Toggle } from '@/shared/ui/toggle';
import './statistics.css';
import { useState } from "react";
import { TableView } from "@/pages/profile/statistics/table-view";
import { ChartView } from "./chart-view";
import { useQuery } from "@tanstack/react-query";
import { statsQueries } from "@/features/get-statistics/stats.ts";
import { countByMonth } from "@/shared/lib/date-stats.ts";

export const Statistics = () => {
  const [enableChartView, setEnableChartView] = useState(false);
  const { data: posts } = useQuery(statsQueries.posts());
  const { data: comments } = useQuery(statsQueries.comments());
  const { data: likes } = useQuery(statsQueries.likes());

  const postsStats = countByMonth(
    (posts ?? []).map((p) => p.creationDate),
  );
  const likesStats = countByMonth(
    (likes ?? []).map((l) => l.creationDate),
  );
  const commentsStats = countByMonth(
    (comments ?? []).map((c) => c.creationDate),
  );

  const switchChartView = () => {
    setEnableChartView(!enableChartView);
  };

  const stats = [
    { title: 'Likes', value: likesStats.current, percents: likesStats.percents },
    { title: 'Comments', value: commentsStats.current, percents: likesStats.percents },
    { title: 'Posts', value: postsStats.current, percents: likesStats.percents },
  ];

  return (
    <section className="stats">
      <div className="stats-cards">
        { stats.map((stat, i) => (
          <div key={ i } className="stats-card">
            <div className="stats-card-title">{ stat.title }</div>
            <div className="stats-card-value">{ stat.value || 0 }</div>
            <div
              className='stats-card-delta'>
              { stat.percents > 0 ? `+${ stat.percents }% ` : `-${ stat.percents }% ` }
              month over month
            </div>
          </div>
        )) }
      </div>

      <div className="stats-toggle">
        <span>Table view</span>
        <Toggle checked={ enableChartView } onChange={ switchChartView }/>
        <span>Enable Chart view</span>
      </div>

      { enableChartView && <ChartView/> }
      { !enableChartView && <TableView/> }

    </section>
  );
};
