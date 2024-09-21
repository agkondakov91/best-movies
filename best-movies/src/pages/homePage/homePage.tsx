import "./homePage.scss";

import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

export const HomePage = () => {
  return (
    <>
      <Header title="Best Movies" subtitle="Top 10 Movies of 2024" />
      <Footer />
    </>
  );
};
