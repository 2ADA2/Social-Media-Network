import { useTranslation } from 'react-i18next';
import './loader.css';

export interface LoaderProps {
  isBlock?: boolean;
}

export const Loader = ({ isBlock = true }: LoaderProps) => {
  const { t } = useTranslation('common');
  if (isBlock) {
    return (
      <div
        role="status"
        aria-label={t('loader.loading')}
        className="loader"
        data-testid="loader"
      >
        <div className="loader-spinner" />
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className="loader-small-container"
      data-testid="loader"
    >
      <div className="loader-spinner" />
    </div>
  );
};
