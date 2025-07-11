import { PATHS } from "@/lib/consts/paths";
import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const PageTags = () => {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Fab
        color="primary"
        size="medium"
        aria-label="Nueva transacción"
        component={RouterLink}
        to={PATHS.root.tags.new.absolute}
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
