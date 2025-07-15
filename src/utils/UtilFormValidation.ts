export default class UtilFormValidation {
  static email(email: string): { isValid: boolean; error: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        error: "El correo electrónico no tiene el formato correcto",
      };
    }
    return {
      isValid: true,
      error: "",
    };
  }

  static confirmPassword(
    password: string,
    confirmPassword: string
  ): { isValid: boolean; error: string } {
    if (password !== confirmPassword) {
      return {
        isValid: false,
        error: "La contraseña no coincide",
      };
    }
    return {
      isValid: true,
      error: "",
    };
  }

  static color(color: string): { isValid: boolean; error: string } {
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      return {
        isValid: false,
        error: "El color debe ser un código hexadecimal válido",
      };
    }
    return {
      isValid: true,
      error: "",
    };
  }

  static password(password: string): { isValid: boolean; error: string } {
    if (password.length < 8) {
      return {
        isValid: false,
        error: "La contraseña debe tener al menos 8 caracteres",
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        error: "La contraseña debe contener al menos una letra mayúscula",
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        isValid: false,
        error: "La contraseña debe contener al menos una letra minúscula",
      };
    }
    if (!/\d/.test(password)) {
      return {
        isValid: false,
        error: "La contraseña debe contener al menos un número",
      };
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return {
        isValid: false,
        error: "La contraseña debe contener al menos un carácter especial",
      };
    }
    return {
      isValid: true,
      error: "",
    };
  }
}
