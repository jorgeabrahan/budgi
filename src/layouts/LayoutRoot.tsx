import {
  PATH_AUTH_FALLBACK,
  PATHS_AUTH,
  PATH_GUEST_FALLBACK,
  PATHS_GUEST,
} from "@/lib/consts/paths";
import ServiceAuth from "@/services/ServiceAuth";
import useStoreUser from "@/stores/useStoreUser";
import { WrapperMain } from "@/wrappers/WrapperMain";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { matchPath, Navigate, Outlet, useLocation } from "react-router-dom";

const matchesAny = (pathname: string, patterns: string[]) =>
  patterns.some((p) => matchPath({ path: p, end: true }, pathname));

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
  const isInNonLoggedInPath = matchesAny(location.pathname, PATHS_GUEST);

  if (!isLoggedIn) {
    if (isInNonLoggedInPath) return <Outlet />;
    return <Navigate to={PATH_GUEST_FALLBACK} replace />;
  }

  if (isInNonLoggedInPath || !matchesAny(location.pathname, PATHS_AUTH)) {
    return <Navigate to={PATH_AUTH_FALLBACK} replace />;
  }

  return (
    <WrapperMain>
      <Outlet />
    </WrapperMain>
  );
};
