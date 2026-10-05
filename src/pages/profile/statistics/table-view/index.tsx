import "./table-view.css";
import { useQuery } from "@tanstack/react-query";
import { statsQueries } from "@/features/get-statistics/stats.ts";
import { useMemo } from "react";
import { countByDay } from "@/shared/lib/stats/count-by-day.ts";

export const TableView = () => {
  const { data: comments } = useQuery(statsQueries.comments());
  const { data: likes } = useQuery(statsQueries.likes());

  const likesByDay = useMemo(
    () => countByDay((likes ?? []).map((l) => l.creationDate), 7),
    [likes],
  );

  const commentsByDay = useMemo(
    () => countByDay((comments ?? []).map((c) => c.creationDate), 7),
    [comments],
  );

  return (
    <div className='stats-container'>
      <div className="stats-block">
        <h2 className="stats-heading">Likes</h2>
        <div className="stats-table">
          <div className="stats-table-title">Last week</div>
          <table className="stats-table-content">
            <thead>
            <tr className="stats-table-head">
              <th className="text-left">Day</th>
              <th className="text-right">Count</th>
            </tr>
            </thead>
            <tbody>
            { likesByDay.map((row, i) => (
              <tr key={ i } className="stats-table-row">
                <td className="text-left">{ row.date }</td>
                <td className="text-right">{ row.count || "-" }</td>
              </tr>
            )) }
            </tbody>
          </table>
        </div>
      </div>

      <div className="stats-block">
        <h2 className="stats-heading">Comments</h2>
        <div className="stats-table">
          <div className="stats-table-title">Last week</div>
          <table className="stats-table-content">
            <thead>
            <tr className="stats-table-head">
              <th className="text-left">Day</th>
              <th className="text-right">Count</th>
            </tr>
            </thead>
            <tbody>
            { commentsByDay.map((row, i) => (
              <tr key={ i } className="stats-table-row">
                <td className="text-left">{row.date}</td>
                <td className="text-right">{ row.count || "-" }</td>
              </tr>
            )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
