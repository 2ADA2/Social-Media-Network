import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import CrossIcon from '@/shared/assets/icons/cross-bold.svg?react';
import './fallback.css';

interface FallbackProps {
  error: Error | null;
  onReset: () => void;
}

export const Fallback = ({ error, onReset }: FallbackProps) => {
  const retry = () => {
    window.location.reload();
  };

  const backToHome = () => {
    onReset();
  };

  return (
    <div className='error-page'>
      <div className='error-container'>
        <CrossIcon/>
        <div className={ 'error-message' }>Oops...<br/>Something bad has just happened</div>
        <small>
          You can
          <Link to={ ROUTES.HOME } onClick={ backToHome }> Back to home </Link>
          or try to <button onClick={ retry }>reload</button> the page
        </small>
        <div className='details-container'>
          <details className="error-fallback-details">
            <summary>Details</summary>
            <pre>{ error?.message || "unknown error" }</pre>
          </details>
        </div>

      </div>
    </div>
  );
};
