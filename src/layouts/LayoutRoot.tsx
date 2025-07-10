import {
  ONLY_LOGGED_IN_FALLBACK_PATH,
  ONLY_LOGGED_IN_PATHS,
  ONLY_NON_LOGGED_IN_FALLBACK_PATH,
  ONLY_NON_LOGGED_IN_PATHS,
} from "@/lib/consts/paths";
import ServiceAuth from "@/services/ServiceAuth";
import useStoreUser from "@/stores/useStoreUser";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const LayoutRoot = () => {
  const location = useLocation();
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const isLoggedIn = useStoreUser((store) => store.isLoggedIn);
  const storeUserLogin = useStoreUser((store) => store.login);
  useEffect(() => {
    ServiceAuth.restoreSession()
      .then((res) => {
        if (res.ok && res.data) {
          storeUserLogin(res.data);
        }
      })
      .finally(() => {
        setIsRestoringSession(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isRestoringSession) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        px={2}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Restaurando sesión...
        </Typography>
      </Box>
    );
  }
  const isInNonLoggedInPath = ONLY_NON_LOGGED_IN_PATHS.includes(
    location.pathname
  );
  if (!isLoggedIn) {
    if (isInNonLoggedInPath) {
      return <Outlet />;
    }
    return <Navigate to={ONLY_NON_LOGGED_IN_FALLBACK_PATH} replace />;
  }
  if (
    isInNonLoggedInPath ||
    !ONLY_LOGGED_IN_PATHS.includes(location.pathname)
  ) {
    return <Navigate to={ONLY_LOGGED_IN_FALLBACK_PATH} replace />;
  }
  return <Outlet />;
};
