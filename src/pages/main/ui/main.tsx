import styles from "./main.module.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";


export const MainPage = () => {
  return (
    <>
      <Header/>
      <main className={ styles.main }>
        MAIN
      </main>
      <Footer/>
    </>
  );
};
