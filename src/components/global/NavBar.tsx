import { useCallback, useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  Payments,
  AccountBalanceWallet,
  LocalOffer,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { PATHS } from "@/lib/consts/paths";

export const NavBar = () => {
  const { pathname } = useLocation();
  const getIndexBasedOnPath = useCallback((path: string) => {
    if (path.startsWith(PATHS.root.transactions.absolute)) return 0;
    if (path.startsWith(PATHS.root.accounts.absolute)) return 1;
    if (path.startsWith(PATHS.root.tags.absolute)) return 2;
    return 0;
  }, []);
  const [value, setValue] = useState(() => {
    return getIndexBasedOnPath(pathname);
  });
  useEffect(() => {
    setValue(getIndexBasedOnPath(pathname));
  }, [getIndexBasedOnPath, pathname]);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        sx={{ backgroundColor: "#262626ff", paddingBlock: 4 }}
      >
        <BottomNavigationAction
          label="Transacciones"
          icon={<Payments />}
          component={RouterLink}
          to={PATHS.root.transactions.absolute}
        />
        <BottomNavigationAction
          label="Cuentas"
          icon={<AccountBalanceWallet />}
          component={RouterLink}
          to={PATHS.root.accounts.absolute}
        />
        <BottomNavigationAction
          label="Etiquetas"
          icon={<LocalOffer />}
          component={RouterLink}
          to={PATHS.root.tags.absolute}
        />
      </BottomNavigation>
    </Paper>
  );
};
