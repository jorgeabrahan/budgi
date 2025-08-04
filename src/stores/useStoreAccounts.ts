import { REQUEST_STATUS } from "@/lib/consts/request";
import type { AccountWithBalance } from "@/types/model.types";
import type { RequestStatus } from "@/types/request.types";
import { create } from "zustand";

type Store = {
  accounts: AccountWithBalance[];
  status: RequestStatus;
  setAccounts: (accounts: AccountWithBalance[]) => void;
  addAccount: (account: AccountWithBalance) => void;
  updateAccount: (account: Partial<AccountWithBalance>) => void;
  removeAccount: (accountId: string) => void;
  setStatus: (status: RequestStatus) => void;
};

const useStoreAccounts = create<Store>()((set) => ({
  accounts: [],
  status: REQUEST_STATUS.idle,
  setAccounts: (accounts) => set({ accounts }),
  addAccount: (account) =>
    set((state) => ({
      accounts: [account, ...state.accounts],
    })),
  updateAccount: (account) =>
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === account.id ? { ...a, ...account } : a
      ),
    })),
  removeAccount: (accountId) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== accountId),
    })),
  setStatus: (status) => set({ status }),
}));

export default useStoreAccounts;
