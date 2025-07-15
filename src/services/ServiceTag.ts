import supabase from "@/configs/supabase";
import type { Tables } from "@/types/database.types";
import type { PostgrestError } from "@supabase/supabase-js";

export default class ServiceTag {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("created_at", { ascending: false });
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
          (error as PostgrestError).message || "Error al obtener etiquetas",
        data: null,
      };
    }
  }
  static async create(tag: Omit<Tables<"tags">, "id" | "created_at">) {
    try {
      const { data: duplicate, error: duplicateError } = await supabase
        .from("tags")
        .select("id")
        .ilike("label", tag.label)
        .eq("user_id", tag.user_id)
        .limit(1)
        .maybeSingle();
      if (duplicateError) throw duplicateError;
      if (duplicate) {
        return {
          ok: false,
          error: `Ya tienes una etiqueta llamada "${tag.label}"`,
          data: null,
        };
      }
      const { data, error } = await supabase
        .from("tags")
        .insert(tag)
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
        error: (error as PostgrestError).message || "Error al crear etiqueta",
        data: null,
      };
    }
  }
  static async delete(id: string) {
    try {
      const { data, error } = await supabase.from("tags").delete().eq("id", id);
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
          (error as PostgrestError).message || "Error al eliminar etiqueta",
        data: null,
      };
    }
  }
  static async update(
    id: string,
    tag: Omit<Tables<"tags">, "id" | "created_at" | "user_id">
  ) {
    try {
      const { data, error } = await supabase
        .from("tags")
        .update(tag)
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
          (error as PostgrestError).message || "Error al actualizar etiqueta",
        data: null,
      };
    }
  }
}
