import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { MainPage } from "@/pages/main";
import { MainLayout } from "@/app/layouts/MainLayout";
import { ProfilePage } from "@/pages/profile";
import { SignUpPage } from "@/pages/sign-up";
import { SignInPage } from "@/pages/sign-in";
import { NotFoundPage } from "@/pages/not-found";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <MainLayout/> }>
          <Route path={ ROUTES.HOME } element={ <MainPage/> }/>
          <Route path={ ROUTES.PROFILE } element={ <ProfilePage/> }/>
        </Route>

        <Route element={ <MainLayout hiddenNav={ true }/> }>
          <Route path={ ROUTES.SIGNUP } element={ <SignUpPage/> }/>
          <Route path={ ROUTES.SIGNIN } element={ <SignInPage/> }/>
        </Route>

        <Route path={ ROUTES.NOT_FOUND } element={ <NotFoundPage/> }/>
      </Routes>
    </BrowserRouter>
  );
};
