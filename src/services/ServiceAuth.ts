import supabase from "@/configs/supabase";
import type { AuthError } from "@supabase/supabase-js";

export default class ServiceAuth {
  static async restoreSession() {
    try {
      const resGetSession = await supabase.auth.getSession();
      const sessionUser = resGetSession.data?.session?.user;
      if (resGetSession.error || !sessionUser?.id) {
        throw resGetSession.error;
      }
      return {
        ok: true,
        error: null,
        data: sessionUser,
      };
    } catch (error) {
      return {
        ok: false,
        error: (error as AuthError)?.message || "Error al restaurar sesión",
        data: null,
      };
    }
  }
  static async signIn({ email = "", password = "" }) {
    try {
      const resSignIn = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (resSignIn.error || !resSignIn.data?.user?.id) {
        throw resSignIn.error;
      }
      return {
        ok: true,
        error: null,
        data: resSignIn.data.user,
      };
    } catch (error) {
      return {
        ok: false,
        error: (error as AuthError)?.message || "Error al iniciar sesión",
        data: null,
      };
    }
  }
  static async signUp({ email = "", password = "", display_name = "" }) {
    try {
      const resSignUp = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name,
          },
        },
      });
      if (resSignUp.error || !resSignUp.data?.user?.id) {
        throw resSignUp.error;
      }
      return {
        ok: true,
        error: null,
        data: resSignUp.data.user,
      };
    } catch (error) {
      return {
        ok: false,
        error: (error as AuthError)?.message || "Error al registrarse",
        data: null,
      };
    }
  }
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      return {
        ok: true,
        error: null,
        data: null,
      };
    } catch (error) {
      return {
        ok: false,
        error: (error as AuthError)?.message || "Error al cerrar sesión",
        data: null,
      };
    }
  }
}
