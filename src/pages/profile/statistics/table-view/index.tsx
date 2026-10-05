import "./table-view.css";
import { type DailyCount } from "@/shared/lib/stats/count-by-day.ts";

interface TableViewProps {
  likesByDay: DailyCount[];
  commentsByDay: DailyCount[];
}

export const TableView = ({ likesByDay, commentsByDay }: TableViewProps) => {
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
                <td className="text-left">{ row.date }</td>
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
