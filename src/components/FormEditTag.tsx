import useForm from "@/hooks/useForm";
import useTags from "@/hooks/useTags";
import { REQUEST_FALLBACK_ERROR } from "@/lib/consts/errors";
import { PATHS } from "@/lib/consts/paths";
import { REQUEST_STATUS } from "@/lib/consts/request";
import useStoreUser from "@/stores/useStoreUser";
import UtilFormValidation from "@/utils/UtilFormValidation";
import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormTag } from "./FormTag";

export const FormEditTag = () => {
  const navigate = useNavigate();
  const params = useParams();
  const user = useStoreUser((store) => store.user);
  const { tags, status, updateTag, deleteTag } = useTags();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [pickerOpen, setPickerOpen] = useState(false);
  const [icon, setIcon] = useState("");

  const { color, label, onChange, setEntries, form, setError } = useForm({
    label: "",
    color: "",
  });

  useEffect(() => {
    // si no se especifico un id de tag a editar
    if (
      !params?.id ||
      typeof params?.id !== "string" ||
      params.id?.trim().length === 0
    ) {
      navigate(PATHS.root.tags.absolute);
      return;
    }
    // si aun no se han cargado las tags
    if (status !== REQUEST_STATUS.finished) {
      return;
    }
    const tag = tags.find((tag) => tag.id === params.id);
    // si no se encontro la tag que se quiere editar
    if (!tag) {
      navigate(PATHS.root.tags.absolute);
      return;
    }
    setIcon(tag.icon);
    setEntries({
      label: tag.label,
      color: tag.color,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id, tags, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !user || !params.id) return;
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
    const { ok, error } = await updateTag(params.id, {
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

  const handleDelete = async () => {
    if (!params.id || isLoading) return;
    const confirmed = window.confirm("¿Eliminar etiqueta de forma permanente?");
    if (!confirmed) return;

    const ok = await deleteTag(params.id);

    if (!ok) {
      setFormError(REQUEST_FALLBACK_ERROR);
      return;
    }
    navigate(PATHS.root.tags.absolute);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
        Editar etiqueta
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
      <Button
        fullWidth
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={handleDelete}
        disabled={isSubmitting || isLoading}
      >
        Eliminar etiqueta
      </Button>
    </Container>
  );
};
