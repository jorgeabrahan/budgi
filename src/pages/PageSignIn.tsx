import useForm from "@/hooks/useForm";
import { REQUEST_FALLBACK_ERROR } from "@/lib/consts/errors";
import ServiceAuth from "@/services/ServiceAuth";
import useStoreUser from "@/stores/useStoreUser";
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

export const PageSignIn = () => {
  const storeUserLogin = useStoreUser((store) => store.login);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email, password, onChange, form } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading) return;
    setFormError("");
    setIsLoading(true);
    const { ok, data, error } = await ServiceAuth.signIn({ email, password });
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
          Iniciar Sesión
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

          {formError && (
            <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
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
            Entrar
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿No tienes cuenta?{" "}
          <Link component={RouterLink} to="/sign-up" underline="hover">
            Regístrate
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
