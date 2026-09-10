import "./main.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { ThemeSwitcher } from "@/features/ui/ThemeSwitcher";

export const MainPage = () => {
  return (
    <>
      <Header/>
      <main className="main">
        <ThemeSwitcher/>
      </main>
      <Footer/>
    </>
  );
};
