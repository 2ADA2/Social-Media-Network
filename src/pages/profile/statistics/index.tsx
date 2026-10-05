import { Toggle } from '@/shared/ui/toggle';
import './statistics.css';
import { useMemo, useState } from "react";
import { TableView } from "@/pages/profile/statistics/table-view";
import { ChartView } from "./chart-view";
import { useQuery } from "@tanstack/react-query";
import { statsQueries } from "@/features/get-statistics/stats.ts";
import { countByWeek } from "@/shared/lib/stats/date-stats.ts";
import { StatsCard } from "@/pages/profile/statistics/stats-card.tsx";

export const Statistics = () => {
  const [enableChartView, setEnableChartView] = useState(false);
  const { data: posts } = useQuery(statsQueries.posts());
  const { data: comments } = useQuery(statsQueries.comments());
  const { data: likes } = useQuery(statsQueries.likes());

  const postsStats = useMemo(() => countByWeek(
    (posts ?? []).map((p) => p.creationDate),
  ), [posts]);
  const likesStats = useMemo(() => countByWeek(
    (likes ?? []).map((l) => l.creationDate),
  ), [likes]);
  const commentsStats = useMemo(() => countByWeek(
    (comments ?? []).map((c) => c.creationDate),
  ), [comments]);

  const switchChartView = () => {
    setEnableChartView(!enableChartView);
  };

  const stats = [
    { id: 1, title: 'Likes', value: likesStats.current, percents: likesStats.percents },
    { id: 2, title: 'Comments', value: commentsStats.current, percents: commentsStats.percents },
    { id: 3, title: 'Posts', value: postsStats.current, percents: postsStats.percents },
  ];

  return (
    <section className="stats">
      <div className="stats-cards">
        { stats.map((stat) => (
          <StatsCard { ...stat } key={ stat.id }/>
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
