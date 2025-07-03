import useForm from "@/hooks/useForm";
import { REQUEST_FALLBACK_ERROR } from "@/lib/consts/errors";
import ServiceAuth from "@/services/ServiceAuth";
import useStoreUser from "@/stores/useStoreUser";
import UtilFormat from "@/utils/UtilFormat";
import UtilFormValidation from "@/utils/UtilFormValidation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export const PageSignUp = () => {
  const storeUserLogin = useStoreUser((store) => store.login);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    name,
    email,
    password,
    confirmPassword,
    onChange,
    form,
    setError,
    setValue,
  } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading) return;
    form.clearErrors();
    setFormError("");
    const formattedName = UtilFormat.name(name);
    setValue(form.name.id, formattedName);

    const emailValidation = UtilFormValidation.email(email);
    if (!emailValidation.isValid) {
      setError(form.email.id, emailValidation.error);
    }
    const passwordValidation = UtilFormValidation.password(password);
    if (!passwordValidation.isValid) {
      setError(form.password.id, passwordValidation.error);
    }
    const confirmPasswordValidation = UtilFormValidation.confirmPassword(
      password,
      confirmPassword
    );
    if (!confirmPasswordValidation.isValid) {
      setError(form.confirmPassword.id, confirmPasswordValidation.error);
    }
    if (!form.isValid()) return;
    setIsLoading(true);
    const { ok, data, error } = await ServiceAuth.signUp({
      email,
      password,
      display_name: name,
    });
    setIsLoading(false);
    if (!ok || !data) {
      setFormError(error ?? REQUEST_FALLBACK_ERROR);
      return;
    }
    storeUserLogin(data);
    form.reset();
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 8 }}>
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          Crear Cuenta
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
            label="Nombre completo"
            type="text"
            variant="outlined"
            name="name"
            value={form.name.value}
            onChange={onChange}
            error={!!form.name.error}
            helperText={form.name.error}
            required
            disabled={isLoading}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Correo electrónico"
            type="email"
            variant="outlined"
            name="email"
            value={form.email.value}
            onChange={onChange}
            error={!!form.email.error}
            helperText={form.email.error}
            required
            disabled={isLoading}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            variant="outlined"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password.value}
            onChange={onChange}
            error={!!form.password.error}
            helperText={form.password.error}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={isLoading}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Confirmar contraseña"
            variant="outlined"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword.value}
            onChange={onChange}
            error={!!form.confirmPassword.error}
            helperText={form.confirmPassword.error}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={isLoading}
          />

          {formError && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mt: 1, mb: 1 }}
            >
              {formError}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
            disabled={isLoading}
          >
            Registrarse
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿Ya tienes una cuenta?{" "}
          <Link component={RouterLink} to="/sign-in" underline="hover">
            Inicia sesión
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
