import type { Tables } from "./database.types";

export type AccountWithBalance = Tables<"accounts"> & {
  balance: number;
  currency_locale: string;
  currency_symbol: string;
  currency_code: string;
  currency_decimals: number;
};
