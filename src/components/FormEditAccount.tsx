import { Button, Container, Typography } from "@mui/material";
import { FormAccount } from "./FormAccount";
import useForm from "@/hooks/useForm";
import { useEffect, useState } from "react";
import useStoreUser from "@/stores/useStoreUser";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "@/lib/consts/paths";
import { REQUEST_STATUS } from "@/lib/consts/request";
import useAccounts from "@/hooks/useAccounts";
import UtilFormValidation from "@/utils/UtilFormValidation";
import { REQUEST_FALLBACK_ERROR } from "@/lib/consts/errors";

export const FormEditAccount = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useStoreUser((store) => store.user);
  const { status, accounts, updateAccount, deleteAccount } = useAccounts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [pickerOpen, setPickerOpen] = useState(false);

  const {
    form,
    icon,
    name,
    color,
    currency,
    onChange,
    setError,
    setValue,
    setEntries,
  } = useForm({
    icon: "",
    name: "",
    color: "",
    currency: "",
  });

  useEffect(() => {
    // si no se especifico un id de cuenta a editar
    if (
      !params?.id ||
      typeof params?.id !== "string" ||
      params.id?.trim().length === 0
    ) {
      navigate(PATHS.root.accounts.absolute);
      return;
    }
    // si aun no se han cargado las tags
    if (status !== REQUEST_STATUS.finished) {
      return;
    }
    const account = accounts.find((account) => account.id === params.id);
    // si no se encontro la tag que se quiere editar
    if (!account) {
      navigate(PATHS.root.tags.absolute);
      return;
    }
    setEntries({
      icon: account.icon,
      name: account.name,
      color: account.color,
      currency: account.currency_id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id, accounts, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !user || !params.id) return;
    form.clearErrors();
    setFormError("");

    const nameRequired = UtilFormValidation.required(name);
    if (!nameRequired.isValid) {
      setError(form.name.id, nameRequired.error);
    }

    const iconRequired = UtilFormValidation.required(icon);
    if (!iconRequired.isValid) {
      setError(form.icon.id, iconRequired.error);
    }

    const colorValidation = UtilFormValidation.color(color);
    if (!colorValidation.isValid) {
      setError(form.color.id, colorValidation.error);
    }

    const currencyValidation = UtilFormValidation.uuid(currency, "moneda");
    if (!currencyValidation.isValid) {
      setError(form.currency.id, currencyValidation.error);
    }

    if (!form.isValid()) return;

    setIsSubmitting(true);
    const { ok, error } = await updateAccount(params.id, {
      name,
      color,
      icon,
      currency_id: currency,
    });
    setIsSubmitting(false);
    if (!ok) {
      setFormError(error ?? REQUEST_FALLBACK_ERROR);
      return;
    }
    form.reset();
    navigate(PATHS.root.accounts.absolute);
  };

  const isLoading = status === REQUEST_STATUS.loading;

  const handleDelete = async () => {
    if (!params.id || isLoading) return;
    const confirmed = window.confirm(
      "¿Eliminar cuenta de forma permanente? Esto tambien eliminara las transacciones que pertenecen a la cuenta"
    );
    if (!confirmed) return;

    const ok = await deleteAccount(params.id);

    if (!ok) {
      setFormError(REQUEST_FALLBACK_ERROR);
      return;
    }
    navigate(PATHS.root.accounts.absolute);
  };
  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
        Editar cuenta
      </Typography>
      <FormAccount
        form={form}
        handleSubmit={handleSubmit}
        onChange={onChange}
        setValue={setValue}
        isDisabled={isSubmitting}
        isIconPickerOpen={pickerOpen}
        setIsIconPickerOpen={setPickerOpen}
        formError={formError}
      />
      <Button
        fullWidth
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={handleDelete}
        disabled={isSubmitting || isLoading}
      >
        Eliminar cuenta
      </Button>
    </Container>
  );
};
