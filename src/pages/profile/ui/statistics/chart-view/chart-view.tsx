import "./chart-view.css";

export const ChartView = () => {
  return (
    <div className='stats-container'>
      <div className='stats-chart'>
        <h2 className='stats-heading'> Likes </h2>
        <div className='chart'>Chart 1</div>
      </div>
      <div className='stats-chart'>
        <h2 className='chart-heading'> Comments </h2>
        <div className='chart'>Chart 2</div>
      </div>
    </div>
  );
};
