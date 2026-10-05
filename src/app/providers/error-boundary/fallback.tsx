import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/shared/config/routes';
import CrossIcon from '@/shared/assets/icons/cross-bold.svg?react';
import './fallback.css';

interface FallbackProps {
  error: Error | null;
  onReset: () => void;
}

export const Fallback = ({ error, onReset }: FallbackProps) => {
  const { t } = useTranslation('common');

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
        <div className={ 'error-message' }>{ t('error.title') }<br/>{ t('error.subtitle') }</div>
        <small>
          { t('error.youCan') }
          <Link to={ ROUTES.HOME } onClick={ backToHome }> { t('error.backToHome') } </Link>
          { t('error.orTryTo') } <button onClick={ retry }>{ t('error.reload') }</button> { t('error.thePage') }
        </small>
        <div className='details-container'>
          <details className="error-fallback-details">
            <summary>{ t('error.details') }</summary>
            <div>{ error?.name || t('error.unknownError') }</div>
            <div>{ error?.message || "" }</div>
          </details>
        </div>

      </div>
    </div>
  );
};
