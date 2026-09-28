import { Navigate, Outlet } from "react-router-dom";

export interface ProtectedRouteInterface {
  condition: boolean,
  route: string,
}

export const ProtectedRoute = ({ condition, route }: ProtectedRouteInterface) => {
  if (!condition) {
    return <Navigate to={ route } replace/>;
  }

  return <Outlet/>;
};
