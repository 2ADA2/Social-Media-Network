import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";
import { MainPage } from "@/pages/main";
import { MainLayout } from "../../layouts/main-layout";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { ProtectedRoute } from "./protected-route.tsx";
import { NotFound } from "@/pages/not-found";
import { lazy, Suspense } from "react";
import { Loader } from "@/shared/ui/loader";
import { ErrorBoundary } from "@/app/providers/error-boundary";

const SignIn = lazy(() => import('@/pages/signin'));
const SignUp = lazy(() => import('@/pages/signup'));
const ProfilePage = lazy(() => import('@/pages/profile'));

export const RouterProvider = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={ <MainLayout/> }>
            <Route element={ <ProtectedRoute condition={ isAuth } route={ ROUTES.SIGNIN }/> }>
              <Route path={ ROUTES.PROFILE } element={
                <Suspense fallback={ <Loader/> }>
                  <ProfilePage/>
                </Suspense>
              }/>
            </Route>

            <Route path={ ROUTES.HOME } element={ <MainPage/> }/>
          </Route>

          // auth
          <Route element={ <MainLayout hiddenNav={ true }/> }>
            <Route element={ <ProtectedRoute condition={ !isAuth } route={ ROUTES.HOME }/> }>
              <Route path={ ROUTES.SIGNUP } element={
                <Suspense fallback={ <Loader/> }>
                  <SignUp/>
                </Suspense>
              }/>
              <Route path={ ROUTES.SIGNIN } element={
                <Suspense fallback={ <Loader/> }>
                  <SignIn/>
                </Suspense>
              }/>
            </Route>
          </Route>

          <Route element={ <MainLayout hiddenNav={ true }/> }>
            <Route path={ ROUTES.NOT_FOUND } element={ <NotFound/> }/>
          </Route>
        </Routes>
      </ErrorBoundary>

    </BrowserRouter>
  );
};
