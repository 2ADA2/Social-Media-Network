import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { MainPage } from "@/pages/main";
import { MainLayout } from "../../layouts/main-layout";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { NotFound } from "@/pages/not-found";
import { lazy } from "react";

const SignIn = lazy(() => import('@/pages/signin'));
const SignUp = lazy(() => import('@/pages/signup'));
const ProfilePage = lazy(() => import('@/pages/profile'));


export const RouterProvider = () => {
  const isAuth = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <MainLayout/> }>
          <Route element={ <ProtectedRoute condition={ isAuth } route={ ROUTES.SIGNIN }/> }>
            <Route path={ ROUTES.PROFILE } element={ <ProfilePage/> }/>
          </Route>

          <Route path={ ROUTES.HOME } element={ <MainPage/> }/>
        </Route>

        <Route element={ <MainLayout hiddenNav={ true }/> }>
          <Route element={ <ProtectedRoute condition={ !isAuth } route={ ROUTES.HOME }/> }>
            <Route path={ ROUTES.SIGNUP } element={ <SignUp/> }/>
            <Route path={ ROUTES.SIGNIN } element={ <SignIn/> }/>
          </Route>
        </Route>

        <Route element={ <MainLayout hiddenNav={ true }/> }>
          <Route path={ ROUTES.NOT_FOUND } element={ <NotFound/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
