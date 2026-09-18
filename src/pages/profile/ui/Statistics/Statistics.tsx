import { Toggle } from '@/shared/ui/Toggle';
import './Statistics.css';
import { useState } from "react";
import { TableView } from "@/pages/profile/ui/Statistics/TableView/TableView.tsx";
import { ChartView } from "@/pages/profile/ui/Statistics/ChartView/ChartView.tsx";

const STATS = [
  { title: 'Title', value: '45,678.90', delta: '+20%', positive: true },
  { title: 'Title', value: '2,405', delta: '+33%', positive: true },
  { title: 'Title', value: '10,353', delta: '-8%', positive: false },
];

export const Statistics = () => {
  const [enableChartView, setEnableChartView] = useState(false);

  const switchChartView = () => {
    setEnableChartView(!enableChartView);
  };

  return (
    <section className="stats">
      <div className="stats-cards">
        { STATS.map((stat, i) => (
          <div key={ i } className="stats-card">
            <div className="stats-card-title">{ stat.title }</div>
            <div className="stats-card-value">{ stat.value }</div>
            <div
              className={ `stats-card-delta ${ stat.positive ? 'stats-card-delta--positive' : 'stats-card-delta--negative' }` }>
              { stat.delta } month over month
            </div>
          </div>
        )) }
      </div>

      <div className="stats-toggle">
        <Toggle checked={ enableChartView } onChange={ switchChartView }/>
        <span>Enable Chart view</span>
      </div>

      {enableChartView && <ChartView />}
      {!enableChartView && <TableView/>}

    </section>
  );
};
