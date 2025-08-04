import useForm from "@/hooks/useForm";
import { DEFAULT_COLOR, DEFAULT_ICON } from "@/lib/consts/defaults";
import useStoreUser from "@/stores/useStoreUser";
import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormAccount } from "./FormAccount";
import UtilFormValidation from "@/utils/UtilFormValidation";
import useAccounts from "@/hooks/useAccounts";
import { REQUEST_FALLBACK_ERROR } from "@/lib/consts/errors";
import { PATHS } from "@/lib/consts/paths";
import { REQUEST_STATUS } from "@/lib/consts/request";

export const FormCreateAccount = () => {
  const navigate = useNavigate();
  const user = useStoreUser((store) => store.user);
  const { status, createAccount } = useAccounts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [pickerOpen, setPickerOpen] = useState(false);

  const { form, icon, name, color, currency, onChange, setError, setValue } =
    useForm({
      icon: DEFAULT_ICON,
      name: "",
      color: DEFAULT_COLOR,
      currency: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !user) return;
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
    const { ok, error } = await createAccount({
      name,
      color,
      icon,
      currency_id: currency,
      user_id: user.id,
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

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
        Crear cuenta
      </Typography>
      <FormAccount
        form={form}
        handleSubmit={handleSubmit}
        onChange={onChange}
        isDisabled={isSubmitting || isLoading}
        isIconPickerOpen={pickerOpen}
        setIsIconPickerOpen={setPickerOpen}
        formError={formError}
        setValue={setValue}
      />
    </Container>
  );
};
