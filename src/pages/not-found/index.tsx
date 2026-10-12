import "./not-found.css";
import NotFoundIcon from "@/shared/assets/icons/not-found.svg?react";
import { useTranslation } from "react-i18next";

export const NotFound = () => {
  const { t } = useTranslation('not-found');

  return (
    <div className='not-found-page'>
      <NotFoundIcon/>
      <div className={ 'not-found-message' }>{ t("title") }</div>
    </div>
  );
};
