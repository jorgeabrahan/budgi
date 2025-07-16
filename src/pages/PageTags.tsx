import {
  alpha,
  Box,
  CircularProgress,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { PATHS } from "@/lib/consts/paths";
import useTags from "@/hooks/useTags";
import { SymbolIcon } from "@/components/global/SymbolIcon";
import { REQUEST_STATUS } from "@/lib/consts/request";

export const PageTags = () => {
  const { tags, status } = useTags();

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", p: 2, mt: 10 }}>
      <Grid container spacing={2}>
        {tags.length === 0 && status === REQUEST_STATUS.finished && (
          <Grid size={12}>
            <Typography
              variant="body1"
              align="center"
              sx={{ mt: 4, color: "text.secondary" }}
            >
              Aún no has creado ninguna etiqueta.
            </Typography>
          </Grid>
        )}
        {status === REQUEST_STATUS.loading && (
          <Grid
            size={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ mt: 4 }}
          >
            <CircularProgress />
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Cargando etiquetas…
            </Typography>
          </Grid>
        )}
        {tags.map((tag) => (
          <Grid size={{ xs: 12, sm: 6 }} key={tag.id}>
            <Paper
              component={RouterLink}
              to={PATHS.root.tags.edit.generate({ id: tag.id })}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                bgcolor: alpha(tag.color, 0.45),
                color: "inherit",
                "&:hover": { opacity: 0.9 },
              }}
              elevation={2}
            >
              <SymbolIcon name={tag.icon} fontSize="large" />
              <Typography
                fontWeight={500}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flexGrow: 1,
                  minWidth: 0,
                }}
              >
                {tag.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        size="medium"
        aria-label="Nueva etiqueta"
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
