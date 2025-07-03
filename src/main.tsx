import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WrapperTheme } from "./wrappers/WrapperTheme";
import { MainRouter } from "./MainRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WrapperTheme>
      <MainRouter />
    </WrapperTheme>
  </StrictMode>
);
