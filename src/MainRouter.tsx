import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageSignIn } from "./pages/PageSignIn";
import { PageSignUp } from "./pages/PageSignUp";
import { LayoutRoot } from "./layouts/LayoutRoot";
import { PageTags } from "./pages/PageTags";
import { PATHS } from "./lib/consts/paths";
import { PageTransactions } from "./pages/PageTransactions";
import { PageAccounts } from "./pages/PageAccounts";
import { PageNewTransaction } from "./pages/transactions/PageNewTransaction";
import { PageNewAccount } from "./pages/accounts/PageNewAccount";
import { PageNewTag } from "./pages/tags/PageNewTag";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.root.absolute} element={<LayoutRoot />}>
          <Route index element={<PageTransactions />} />
          <Route path={PATHS.root.tags.relative}>
            <Route index element={<PageTags />} />
            <Route
              path={PATHS.root.tags.new.relative}
              element={<PageNewTag />}
            />
          </Route>
          <Route path={PATHS.root.transactions.relative}>
            <Route index element={<PageTransactions />} />
            <Route
              path={PATHS.root.transactions.new.relative}
              element={<PageNewTransaction />}
            />
          </Route>
          <Route path={PATHS.root.accounts.relative}>
            <Route index element={<PageAccounts />} />
            <Route
              path={PATHS.root.accounts.new.relative}
              element={<PageNewAccount />}
            />
          </Route>
          <Route path={PATHS.root.signIn.relative} element={<PageSignIn />} />
          <Route path={PATHS.root.signUp.relative} element={<PageSignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
