import { HomePage } from "./pages/homePage/homePage";
import { FilmPage } from "./pages/filmPage/filmPage";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/film/:id" element={<FilmPage />} />
    </Routes>
  );
}
