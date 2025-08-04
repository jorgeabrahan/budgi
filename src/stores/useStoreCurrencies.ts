import { REQUEST_STATUS } from "@/lib/consts/request";
import type { Tables } from "@/types/database.types";
import type { RequestStatus } from "@/types/request.types";
import { create } from "zustand";

type Store = {
  currencies: Tables<"currencies">[];
  status: RequestStatus;
  setCurrencies: (tags: Tables<"currencies">[]) => void;
  setStatus: (status: RequestStatus) => void;
};

const useStoreCurrencies = create<Store>()((set) => ({
  currencies: [],
  status: REQUEST_STATUS.idle,
  setCurrencies: (currencies) => set({ currencies }),
  setStatus: (status: RequestStatus) => set({ status }),
}));

export default useStoreCurrencies;
