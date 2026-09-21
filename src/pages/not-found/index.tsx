import "./not-found.css";
import NotFoundIcon from "@/shared/assets/icons/not-found.svg?react";

export const NotFound = () => {
  return (
    <div className='not-found-page'>
      <NotFoundIcon />
      <div className={'not-found-message'}>Page not found</div>
    </div>
  );
};
