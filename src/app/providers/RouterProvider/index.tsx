import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { MainPage } from "@/pages/main";
import { MainLayout } from "@/app/layouts/MainLayout";
import { ProfilePage } from "@/pages/profile";
import { SignUpPage } from "@/pages/sign-up";
import { SignInPage } from "@/pages/sign-in";
import { NotFoundPage } from "@/pages/not-found";
import { useUser } from "@/features/auth";
import { ProtectedRoute } from "./ProtectedRoute.tsx";


export const RouterProvider = () => {
  const userContext = useUser();
  const isAuth = userContext.isAuth;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <MainLayout/> }>

          // auth-protected
          <Route element={ <ProtectedRoute condition={ isAuth } route={ ROUTES.SIGNIN }/> }>
            <Route path={ ROUTES.PROFILE } element={ <ProfilePage/> }/>
          </Route>

          <Route path={ ROUTES.HOME } element={ <MainPage/> }/>

        </Route>

        <Route element={ <MainLayout hiddenNav={ true }/> }>
          <Route element={ <ProtectedRoute condition={ !isAuth } route={ ROUTES.HOME }/> }>
            <Route path={ ROUTES.SIGNUP } element={ <SignUpPage/> }/>
            <Route path={ ROUTES.SIGNIN } element={ <SignInPage/> }/>
          </Route>
        </Route>

        <Route path={ ROUTES.NOT_FOUND } element={ <NotFoundPage/> }/>
      </Routes>
    </BrowserRouter>
  );
};
