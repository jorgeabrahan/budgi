import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

type Store = {
  isLoggedIn: boolean;
  user: null | User;
  login: (user: User) => void;
  logout: () => void;
};

const useStoreUser = create<Store>()((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user: User) => set(() => ({ isLoggedIn: true, user })),
  logout: () => set(() => ({ isLoggedIn: false, user: null })),
}));

export default useStoreUser;
