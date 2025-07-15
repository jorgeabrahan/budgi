import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { REQUEST_FALLBACK_ERROR } from "@/lib/consts/errors";
import useTags from "@/hooks/useTags";
import useForm from "@/hooks/useForm";
import useStoreUser from "@/stores/useStoreUser";
import UtilFormValidation from "@/utils/UtilFormValidation";
import { REQUEST_STATUS } from "@/lib/consts/request";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/lib/consts/paths";
import { FormTag } from "./FormTag";

const DEFAULT_ICON = "receipt_long";
const DEFAULT_COLOR = "#000000";

export const FormCreateTag = () => {
  const navigate = useNavigate();
  const user = useStoreUser((store) => store.user);
  const { status, createTag } = useTags();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [pickerOpen, setPickerOpen] = useState(false);
  const [icon, setIcon] = useState(DEFAULT_ICON);

  const { color, label, onChange, form, setError } = useForm({
    label: "",
    color: DEFAULT_COLOR,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !user) return;
    form.clearErrors();
    setFormError("");

    if (icon.trim().length === 0) {
      setFormError("Debes seleccionar un icono");
      return;
    }

    const colorValidation = UtilFormValidation.color(color);
    if (!colorValidation.isValid) {
      setError(form.color.id, colorValidation.error);
    }

    if (!form.isValid()) return;

    setIsSubmitting(true);
    const { ok, error } = await createTag({
      label,
      color,
      user_id: user.id,
      icon,
    });
    setIsSubmitting(false);
    if (!ok) {
      setFormError(error ?? REQUEST_FALLBACK_ERROR);
      return;
    }
    form.reset();
    navigate(PATHS.root.tags.absolute);
  };

  const isLoading = status === REQUEST_STATUS.loading;

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
        Nueva etiqueta
      </Typography>
      <FormTag
        form={form}
        icon={icon}
        setIcon={setIcon}
        handleSubmit={handleSubmit}
        onChange={onChange}
        isDisabled={isSubmitting || isLoading}
        isIconPickerOpen={pickerOpen}
        setIsIconPickerOpen={setPickerOpen}
        formError={formError}
      />
    </Container>
  );
};
