import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SymbolIcon } from "./global/SymbolIcon";
import { DialogIconPicker } from "./dialogs/DialogIconPicker";
import useCurrencies from "@/hooks/useCurrencies";
import { REQUEST_STATUS } from "@/lib/consts/request";

interface FormAccountProps {
  form: {
    icon: {
      id: "icon";
      value: string;
      error: string;
    };
    name: {
      id: "name";
      value: string;
      error: string;
    };
    color: {
      id: "color";
      value: string;
      error: string;
    };
    currency: {
      id: "currency";
      value: string;
      error: string;
    };
  } & {
    reset: () => void;
    clearErrors: () => void;
    isValid: () => boolean;
  };
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setValue: (
    inputKey: "currency" | "name" | "color" | "icon",
    value: string | boolean | number
  ) => void;
  isDisabled: boolean;
  isIconPickerOpen: boolean;
  setIsIconPickerOpen: (isOpen: boolean) => void;
  formError: string;
}

export const FormAccount = ({
  form,
  handleSubmit,
  onChange,
  setValue,
  isDisabled,
  isIconPickerOpen,
  setIsIconPickerOpen,
  formError,
}: FormAccountProps) => {
  const { status: statusCurrencies, currencies } = useCurrencies();
  const isLoading = statusCurrencies === REQUEST_STATUS.loading || isDisabled;
  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Nombre de la cuenta"
        name={form.name.id}
        value={form.name.value}
        onChange={onChange}
        error={!!form.name.error}
        helperText={form.name.error}
        required
        disabled={isLoading}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel shrink htmlFor={form.color.id}>
          Color
        </InputLabel>
        <TextField
          id={form.color.id}
          name={form.color.id}
          value={form.color.value}
          onChange={onChange}
          error={!!form.color.error}
          helperText={form.color.error}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <Box
                component="input"
                type="color"
                value={form.color.value}
                onChange={onChange}
                name={form.color.id}
                disabled={isLoading}
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
            if (isLoading) return;
            document
              .querySelector<HTMLInputElement>(
                `input[type="color"][name="${form.color.id}"]`
              )
              ?.click();
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel shrink htmlFor={form.icon.id}>
          Icono
        </InputLabel>
        <TextField
          id={form.icon.id}
          name={form.icon.id}
          value={form.icon.value}
          error={!!form.icon.error}
          helperText={form.icon.error}
          disabled={isLoading}
          onClick={() => {
            if (isLoading) return;
            setIsIconPickerOpen(true);
          }}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SymbolIcon name={form.icon.value} size="26px" />
              </Box>
            ),
            readOnly: true,
            sx: { cursor: "pointer" },
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal" required disabled={isLoading}>
        <InputLabel id="currency-label">Moneda</InputLabel>
        <Select
          labelId="currency-label"
          id={form.currency.id}
          name={form.currency.id}
          value={form.currency.value}
          required
          onChange={(event) =>
            onChange({
              target: {
                name: form.currency.id,
                value: event.target.value,
              },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          error={!!form.currency.error}
          disabled={isLoading}
          label="Moneda"
        >
          <MenuItem disabled value="">
            <em>-- Selecciona una moneda --</em>
          </MenuItem>
          {currencies.map((currency) => (
            <MenuItem
              disabled={!currency.is_active}
              value={currency.id}
              key={currency.id}
            >
              ({currency.code}) {currency.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DialogIconPicker
        open={isIconPickerOpen}
        onClose={() => setIsIconPickerOpen(false)}
        onSelect={(icon) => setValue(form.icon.id, icon)}
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
        disabled={isLoading}
      >
        Guardar cuenta
      </Button>
    </Box>
  );
};
