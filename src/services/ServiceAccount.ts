import supabase from "@/configs/supabase";
import type { Tables } from "@/types/database.types";
import type { AccountWithBalance } from "@/types/model.types";
import type { PostgrestError } from "@supabase/supabase-js";

export default class ServiceAccount {
  static async getAll(userId: string = ""): Promise<{
    ok: boolean;
    error: string | null;
    data: AccountWithBalance[] | null;
  }> {
    try {
      const { data, error } = await supabase.rpc(
        "get_user_accounts_with_balance",
        {
          p_user_id: userId,
        }
      );
      if (error) throw error;
      return {
        ok: true,
        error: null,
        data: data as AccountWithBalance[],
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
      const { data: duplicate, error: duplicateError } = await supabase
        .from("accounts")
        .select("id")
        .ilike("name", account.name)
        .eq("user_id", account.user_id)
        .limit(1)
        .maybeSingle();

      if (duplicateError) throw duplicateError;

      if (duplicate) {
        return {
          ok: false,
          error: `Ya tienes una cuenta llamada "${account.name}"`,
          data: null,
        };
      }
      const { data, error } = await supabase
        .from("accounts")
        .insert(account)
        .select("*")
        .maybeSingle();
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
        .eq("id", id)
        .select("*")
        .maybeSingle();
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
