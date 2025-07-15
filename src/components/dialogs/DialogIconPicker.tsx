import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { ICONS } from "@/lib/consts/icons";
import { SymbolIcon } from "../global/SymbolIcon";

type DialogIconPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
};

export const DialogIconPicker = ({
  open,
  onClose,
  onSelect,
}: DialogIconPickerProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const id = setTimeout(
      () => setDebouncedQuery(query.trim().toLowerCase()),
      400
    );
    return () => clearTimeout(id);
  }, [query]);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return ICONS;
    return ICONS.filter((n) => n.includes(debouncedQuery));
  }, [debouncedQuery]);

  const reset = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  const handleSelect = (name: string) => {
    onSelect(name);
    onClose();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        Selecciona un icono
        <Box flexGrow={1} />
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          fullWidth
          placeholder="Buscar…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          margin="normal"
        />

        <Grid
          container
          spacing={1}
          sx={{ mt: 1, maxHeight: 360, overflowY: "auto", overflowX: "hidden" }}
        >
          {filtered.map((name) => (
            <Grid key={name}>
              <IconButton
                onClick={() => handleSelect(name)}
                sx={{ width: "100%", height: "100%" }}
              >
                <SymbolIcon name={name} fontSize="large" />
              </IconButton>
            </Grid>
          ))}

          {filtered.length === 0 && (
            <Grid>
              <Typography
                variant="body2"
                align="center"
                sx={{ width: "100%", mt: 2 }}
              >
                Sin resultados
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
