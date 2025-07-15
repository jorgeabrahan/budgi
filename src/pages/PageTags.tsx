import { alpha, Box, Fab, Grid, Paper, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { PATHS } from "@/lib/consts/paths";
import useTags from "@/hooks/useTags";
import { SymbolIcon } from "@/components/global/SymbolIcon";

export const PageTags = () => {
  const { tags } = useTags();

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", p: 2, mt: 10 }}>
      <Grid container spacing={2}>
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
