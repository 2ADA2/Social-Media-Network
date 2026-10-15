import InfoIcon from '@/shared/assets/icons/info-filled.svg?react';

interface ShowInputInfoProps {
  error?: string;
  info?: string;
  icon?: React.ReactNode;
}

export const ShowInputInfo = ({ error, info, icon }: ShowInputInfoProps) => {
  if (error) {
    return (
      <div
        className="info error-info"
        aria-live="polite"
        data-testid="input-info"
      >
        <InfoIcon className="ignore" aria-hidden={true} />
        <small>{error}</small>
      </div>
    );
  }

  if (info) {
    return (
      <div className="info" data-testid="input-info">
        {icon || <InfoIcon className="ignore" aria-hidden={true} />}
        <small> {info} </small>
      </div>
    );
  }

  return null;
};
