import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { MainPage } from "@/pages/main";
import { MainLayout } from "@/app/layouts/MainLayout";
import { ProfilePage } from "@/pages/profile";
import { NotFoundPage } from "@/pages/not-found";
import { useAuth } from "@/features/auth";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { SignIn } from "@/pages/signin";
import { SignUp } from "@/pages/signup";


export const RouterProvider = () => {
  const isAuth = useAuth();

  return (
    <BrowserRouter basename={ "Social-Media-Network" }>
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
            <Route path={ ROUTES.SIGNUP } element={ <SignUp/> }/>
            <Route path={ ROUTES.SIGNIN } element={ <SignIn/> }/>
          </Route>
        </Route>

        <Route path={ ROUTES.NOT_FOUND } element={ <NotFoundPage/> }/>
      </Routes>
    </BrowserRouter>
  );
};
