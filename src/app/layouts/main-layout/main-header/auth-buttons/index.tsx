import "./auth-buttons.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/config/routes.ts";

export const AuthButtons = () => {
  const { t } = useTranslation('common');

  return (
    <nav className="header-auth-nav">
      <Link to={ ROUTES.SIGNIN }>{ t('nav.signIn') }</Link>
      <Link to={ ROUTES.SIGNUP }>{ t('nav.signUp') }</Link>
    </nav>
  );
};
