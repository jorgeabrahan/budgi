import supabase from "@/configs/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

export default class ServiceCurrency {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from("currencies")
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
        error: (error as PostgrestError).message || "Error al obtener monedas",
        data: null,
      };
    }
  }
}
