import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { SymbolIcon } from "./global/SymbolIcon";
import { DialogIconPicker } from "./dialogs/DialogIconPicker";

interface FormTagProps {
  form: {
    label: {
      id: "label";
      value: string;
      error: string;
    };
    color: {
      id: "color";
      value: string;
      error: string;
    };
  } & {
    reset: () => void;
    clearErrors: () => void;
    isValid: () => boolean;
  };
  icon: string;
  setIcon: (icon: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isDisabled: boolean;
  isIconPickerOpen: boolean;
  setIsIconPickerOpen: (isOpen: boolean) => void;
  formError: string;
}

export const FormTag = ({
  form,
  icon,
  setIcon,
  handleSubmit,
  onChange,
  isDisabled,
  isIconPickerOpen,
  setIsIconPickerOpen,
  formError,
}: FormTagProps) => {
  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Nombre de la etiqueta"
        name={form.label.id}
        value={form.label.value}
        onChange={onChange}
        error={!!form.label.error}
        helperText={form.label.error}
        required
        disabled={isDisabled}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel shrink htmlFor="color">
          Color
        </InputLabel>
        <TextField
          id="color"
          name={form.color.id}
          value={form.color.value}
          onChange={onChange}
          error={!!form.color.error}
          helperText={form.color.error}
          InputProps={{
            endAdornment: (
              <Box
                component="input"
                type="color"
                value={form.color.value}
                onChange={onChange}
                name={form.color.id}
                disabled={isDisabled}
                sx={{
                  width: 32,
                  height: 32,
                  border: "none",
                  p: 0,
                  bgcolor: "transparent",
                  cursor: "pointer",
                }}
              />
            ),
            readOnly: true,
            sx: { cursor: "pointer" },
          }}
          onClick={() => {
            if (isDisabled) return;
            document
              .querySelector<HTMLInputElement>(
                `input[type="color"][name="${form.color.id}"]`
              )
              ?.click();
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel shrink htmlFor="icon">
          Icono
        </InputLabel>
        <TextField
          id="icon"
          name="icon"
          value={icon}
          onClick={() => {
            if (isDisabled) return;
            setIsIconPickerOpen(true);
          }}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SymbolIcon name={icon} size="26px" />
              </Box>
            ),
            readOnly: true,
            sx: { cursor: "pointer" },
          }}
        />
      </FormControl>

      <DialogIconPicker
        open={isIconPickerOpen}
        onClose={() => setIsIconPickerOpen(false)}
        onSelect={setIcon}
      />

      {formError && (
        <Typography color="error" sx={{ mt: 1 }}>
          {formError}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        type="submit"
        disabled={isDisabled}
      >
        Guardar etiqueta
      </Button>
    </Box>
  );
};
