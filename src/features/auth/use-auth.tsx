import { useAppSelector, useAppDispatch } from '@/app/store/hooks.ts';
import { selectIsAuthenticated } from '@/entities/user/model/selectors.ts';
import { logout as logoutAction, setCredentials } from "@/entities/user/model/user-slice.ts";
import { signinRequest } from "@/features/auth/signin.ts";
import { signupRequest } from "@/features/auth/signup.ts";
import { getMe } from "@/features/auth/me.ts";

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const auth = async (token: string) => {
    const user = await getMe();
    dispatch(setCredentials({ user, token }));
  };

  const signin = async (email: string, password: string) => {
    const { user, token } = await signinRequest({ email, password });
    localStorage.setItem('token', token);
    dispatch(setCredentials({ user, token }));
    auth(token);
  };

  const signup = async (data: {
    email: string;
    password: string;
    username?: string;
  }) => {
    await signupRequest(data);
    await signin(data.email, data.password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  return {
    isAuth,
    auth,
    logout,
    signin,
    signup,
  };
};

