import { Outlet } from "react-router-dom";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import "./MainLayout.css";
import type { HeaderProps } from "@/widgets/header/ui/header.tsx";

export const MainLayout = ({ hiddenNav = false }: HeaderProps) => {
  return (
    <>
      <Header hiddenNav={hiddenNav} />
      <main className="main">
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};
