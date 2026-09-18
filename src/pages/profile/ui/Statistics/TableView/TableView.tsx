import "./TableView.css";

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
    <>
      <div className="stats-block">
        <h2 className="stats-heading">Likes</h2>
        <div className="stats-table">
          <div className="stats-table-title">Title</div>
          <div className="stats-table-head">
            <span>Col 1</span>
            <span>Col 2</span>
            <span>Col 3</span>
          </div>
          { LIKES.map((row, i) => (
            <div key={ i } className="stats-table-row">
              <span>Row { i + 1 }</span>
              <span>{ row.col1 }</span>
              <span>{ row.col2 }</span>
            </div>
          )) }
        </div>
      </div>

      <div className="stats-block">
        <h2 className="stats-heading">Comments</h2>
        <div className="stats-table">
          <div className="stats-table-title">Title</div>
          <div className="stats-table-head">
            <span>Col 1</span>
            <span>Col 2</span>
            <span>Col 3</span>
          </div>
          { COMMENTS.map((row, i) => (
            <div key={ i } className="stats-table-row">
              <span>Row { i + 1 }</span>
              <span>{ row.col1 }</span>
              <span>{ row.col2 }</span>
            </div>
          )) }
        </div>
      </div>
    </>
  );
};
