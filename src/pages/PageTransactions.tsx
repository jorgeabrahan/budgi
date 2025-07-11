import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { PATHS } from "@/lib/consts/paths";

export const PageTransactions = () => {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Fab
        color="primary"
        size="medium"
        aria-label="Nueva transacción"
        component={RouterLink}
        to={PATHS.root.transactions.new.absolute}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1100,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};
