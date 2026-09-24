import { Outlet } from "react-router-dom";
import "./main-layout.css";
import { type HeaderProps, MainHeader } from "@/app/layouts/main-layout/main-header";
import { MainFooter } from "@/app/layouts/main-layout/main-footer";

export const MainLayout = ({ hiddenNav = false }: HeaderProps) => {
  return (
    <>
      <MainHeader hiddenNav={hiddenNav} />
      <main className="main">
        <Outlet/>
      </main>
      <MainFooter/>
    </>
  );
};
