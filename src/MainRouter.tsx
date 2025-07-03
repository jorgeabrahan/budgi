import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageHome } from "./pages/PageHome";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageHome />} />
      </Routes>
    </BrowserRouter>
  );
};
