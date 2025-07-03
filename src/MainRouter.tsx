import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageHome } from "./pages/PageHome";
import { PageSignIn } from "./pages/PageSignIn";
import { PageSignUp } from "./pages/PageSignUp";
import { LayoutRoot } from "./layouts/LayoutRoot";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutRoot />}>
          <Route index element={<PageHome />} />
          <Route path="/sign-in" element={<PageSignIn />} />
          <Route path="/sign-up" element={<PageSignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
