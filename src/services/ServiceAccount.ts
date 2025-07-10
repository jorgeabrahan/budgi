import supabase from "@/configs/supabase";
import type { Tables } from "@/types/database.types";
import type { PostgrestError } from "@supabase/supabase-js";

export default class ServiceAccount {
  static async getAll() {
    try {
      const { data, error } = await supabase.from("accounts").select("*");
      if (error) throw error;
      return {
        ok: true,
        error: null,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error: (error as PostgrestError).message || "Error al obtener cuentas",
        data: null,
      };
    }
  }

  static async create(account: Omit<Tables<"accounts">, "id" | "created_at">) {
    try {
      const { data, error } = await supabase.from("accounts").insert(account);
      if (error) throw error;
      return {
        ok: true,
        error: null,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error: (error as PostgrestError).message || "Error al crear cuenta",
        data: null,
      };
    }
  }

  static async delete(id: string) {
    try {
      const { data, error } = await supabase
        .from("accounts")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return {
        ok: true,
        error: null,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error: (error as PostgrestError).message || "Error al eliminar cuenta",
        data: null,
      };
    }
  }

  static async update(
    id: string,
    account: Omit<Tables<"accounts">, "id" | "created_at" | "user_id">
  ) {
    try {
      const { data, error } = await supabase
        .from("accounts")
        .update(account)
        .eq("id", id);
      if (error) throw error;
      return {
        ok: true,
        error: null,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error:
          (error as PostgrestError).message || "Error al actualizar cuenta",
        data: null,
      };
    }
  }
}
