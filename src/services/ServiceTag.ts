import supabase from "@/configs/supabase";
import type { Tables } from "@/types/database.types";
import type { PostgrestError } from "@supabase/supabase-js";

export default class ServiceTag {
  static async getAll() {
    try {
      const { data, error } = await supabase.from("tags").select("*");
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
      const { data, error } = await supabase.from("tags").insert(tag);
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
          (error as PostgrestError).message || "Error al actualizar etiqueta",
        data: null,
      };
    }
  }
}
