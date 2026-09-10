import "./main.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Toggle } from "@/shared/ui/Toggle";
import { useEffect, useState } from "react";


export const MainPage = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {

  }, [checked]);
  return (
    <>
      <Header/>
      <main className="main">
        <Toggle checked={checked} onChange={() => setChecked(!checked)}/>
      </main>
      <Footer/>
    </>
  );
};
