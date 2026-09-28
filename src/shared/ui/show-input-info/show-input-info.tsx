import InfoIcon from "@/shared/assets/icons/info-filled.svg?react";

interface ShowInputInfoProps {
  error?: string;
  info?: string;
  icon?: React.ReactNode;
}

export const ShowInputInfo = ({ error, info, icon }: ShowInputInfoProps) => {
  if (error) {
    return (
      <div className='info error-info'>
        <InfoIcon className='ignore'/>
        <small>{ error }</small>
      </div>
    );
  }

  if (info) {
    return (
      <div className='info'>
        {icon || <InfoIcon className='ignore'/>}
        <small>{ info }</small>
      </div>
    );
  }

  return null;
};
