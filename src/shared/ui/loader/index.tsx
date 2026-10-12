import './loader.css';

export interface LoaderProps {
  isBlock?: boolean;
}

export const Loader = ({ isBlock = true }: LoaderProps) => {
  if (isBlock) {
    return (
      <div className="loader">
        <div className="loader-spinner"/>
      </div>
    );
  }

  return (
    <div className="loader-small-container">
      <div className="loader-spinner"/>
    </div>
  );
};
