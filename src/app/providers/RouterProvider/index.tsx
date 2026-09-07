import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "@/pages/main";
import { ROUTES } from "@/shared/config/routes.ts";
import { ProfilePage } from "@/pages/profile/ui/ProfilePage.tsx";
import { SignUpPage } from "@/pages/sign-up/ui/SignUpPage.tsx";
import { SignInPage } from "@/pages/sign-in/ui/SignInPage.tsx";
import { MainLayout } from "@/app/layouts/MainLayout";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<MainPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

        <Route element={<MainLayout hiddenNav={true} />}>
          <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
          <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
