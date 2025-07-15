import useAccounts from "@/hooks/useAccounts";
import useForm from "@/hooks/useForm";
import useTags from "@/hooks/useTags";
import { REQUEST_FALLBACK_ERROR } from "@/lib/consts/errors";
import { PATHS } from "@/lib/consts/paths";
import {
  TRANSACTION_TYPES,
  TRANSACTION_TYPES_LABELS,
} from "@/lib/consts/transaction";
import type { Tables } from "@/types/database.types";
import { AccountBalanceWallet, LocalOffer } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import FileDropZone from "./global/FileDropZone";

const DATE_INSTANCE = new Date();

export const FormCreateTransaction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const { tags } = useTags();
  const { accounts } = useAccounts();
  const [today] = DATE_INSTANCE.toISOString().split("T");
  const {
    date,
    type,
    amount,
    interest_rate,
    account_id,
    description,
    onChange,
    form,
  } = useForm({
    date: today,
    type: "",
    amount: "",
    interest_rate: "",
    account_id: "",
    description: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const isLoanOrDebt = useMemo(
    () => type === TRANSACTION_TYPES.loan || type === TRANSACTION_TYPES.debt,
    [type]
  );
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    form.clearErrors();
    setFormError("");

    // TODO: agregar validaciones
    if (!form.isValid()) return;

    setIsSubmitting(true);
    try {
      console.log({
        date,
        type,
        amount,
        interest_rate,
        account_id,
        description,
      });
    } catch {
      setFormError(REQUEST_FALLBACK_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
        Nueva transacción
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Fecha"
          type="date"
          name={form.date.id}
          value={form.date.value}
          onChange={onChange}
          error={!!form.date.error}
          helperText={form.date.error}
          InputLabelProps={{ shrink: true }}
          required
          disabled={isSubmitting}
        />

        <FormControl fullWidth margin="normal" required disabled={isSubmitting}>
          <InputLabel id="type-label">Tipo de transacción</InputLabel>
          <Select
            labelId="type-label"
            id={form.type.id}
            name={form.type.id}
            value={form.type.value}
            onChange={(event) =>
              onChange({
                target: {
                  name: form.type.id,
                  value: event.target.value,
                },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            error={!!form.type.error}
            label="Tipo de transacción"
          >
            <MenuItem disabled value="">
              <em>Selecciona un tipo</em>
            </MenuItem>
            {Object.entries(TRANSACTION_TYPES_LABELS).map(([key, value]) => (
              <MenuItem value={key} key={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Monto"
          name={form.amount.id}
          value={form.amount.value}
          onChange={onChange}
          error={!!form.amount.error}
          helperText={form.amount.error}
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          required
          disabled={isSubmitting}
        />

        {isLoanOrDebt && (
          <TextField
            fullWidth
            margin="normal"
            label="Tasa de interés (%)"
            name={form.interest_rate.id}
            value={form.interest_rate.value}
            onChange={onChange}
            error={!!form.interest_rate.error}
            helperText={form.interest_rate.error}
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            disabled={isSubmitting}
          />
        )}

        <FormControl fullWidth margin="normal" required disabled={isSubmitting}>
          <InputLabel id="account-label">Cuenta</InputLabel>
          <Box sx={{ display: "flex", alignItems: "stretch", gap: 1 }}>
            <Select
              fullWidth
              labelId="account-label"
              id={form.account_id.id}
              name={form.account_id.id}
              value={form.account_id.value}
              onChange={(event) =>
                onChange({
                  target: {
                    name: form.account_id.id,
                    value: event.target.value,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              error={!!form.account_id.error}
              label="Cuenta"
            >
              <MenuItem disabled value="">
                <em>-- Selecciona una cuenta --</em>
              </MenuItem>
              {accounts.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
            <Tooltip title="Gestionar cuentas">
              <Button
                color="primary"
                variant="contained"
                size="medium"
                component={RouterLink}
                to={PATHS.root.accounts.new.absolute}
                sx={{
                  minWidth: "unset",
                  width: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                disabled={isSubmitting}
              >
                <AccountBalanceWallet fontSize="small" />
              </Button>
            </Tooltip>
          </Box>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          name={form.description.id}
          value={form.description.value}
          onChange={onChange}
          error={!!form.description.error}
          helperText={form.description.error}
          multiline
          minRows={3}
          disabled={isSubmitting}
        />

        <Box sx={{ display: "flex", alignItems: "stretch", gap: 1 }}>
          <Autocomplete
            multiple
            options={tags}
            getOptionLabel={(option: Tables<"tags">) => option.label}
            filterSelectedOptions
            disableClearable
            sx={{ flex: 1, my: 0 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Etiquetas"
                disabled={isSubmitting}
                margin="normal"
              />
            )}
          />

          <Tooltip title="Gestionar etiquetas">
            <Button
              color="primary"
              variant="contained"
              size="medium"
              component={RouterLink}
              to={PATHS.root.tags.new.absolute}
              sx={{
                minWidth: "unset",
                width: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "16px",
                mb: "8px",
              }}
              disabled={isSubmitting}
            >
              <LocalOffer fontSize="small" />
            </Button>
          </Tooltip>
        </Box>

        <FileDropZone
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          disabled={isSubmitting}
        />

        {formError && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {formError}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          type="submit"
          disabled={isSubmitting}
        >
          Guardar Transacción
        </Button>
      </Box>
    </Container>
  );
};
