import "./table-view.css";

const LIKES = [
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
];

const COMMENTS = [
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
  { col1: 123, col2: 456 },
];

export const TableView = () => {
  return (
    <div className='stats-container'>
      <div className="stats-block">
        <h2 className="stats-heading">Likes</h2>
        <div className="stats-table">
          <div className="stats-table-title">Title</div>
          <table className="stats-table-content">
            <thead>
            <tr className="stats-table-head">
              <th className="text-left">Col 1</th>
              <th className="text-right">Col 2</th>
              <th className="text-right">Col 3</th>
            </tr>
            </thead>
            <tbody>
            { LIKES.map((row, i) => (
              <tr key={ i } className="stats-table-row">
                <td className="text-left">Row { i + 1 }</td>
                <td className="text-right">{ row.col1 }</td>
                <td className="text-right">{ row.col2 }</td>
              </tr>
            )) }
            </tbody>
          </table>
        </div>
      </div>

      <div className="stats-block">
        <h2 className="stats-heading">Comments</h2>
        <div className="stats-table">
          <div className="stats-table-title">Title</div>
          <table className="stats-table-content">
            <thead>
            <tr className="stats-table-head">
              <th className="text-left">Col 1</th>
              <th className="text-right">Col 2</th>
              <th className="text-right">Col 3</th>
            </tr>
            </thead>
            <tbody>
            { COMMENTS.map((row, i) => (
              <tr key={ i } className="stats-table-row">
                <td className="text-left">Row { i + 1 }</td>
                <td className="text-right">{ row.col1 }</td>
                <td className="text-right">{ row.col2 }</td>
              </tr>
            )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
