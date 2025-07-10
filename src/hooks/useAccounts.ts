import { useEffect } from "react";
import useStoreAccounts from "@/stores/useStoreAccounts";
import { REQUEST_STATUS } from "@/lib/consts/request";
import ServiceAccount from "@/services/ServiceAccount";
import type { Tables } from "@/types/database.types";

const useAccounts = () => {
  const accounts = useStoreAccounts((store) => store.accounts);
  const status = useStoreAccounts((store) => store.status);
  const storeSetAccounts = useStoreAccounts((store) => store.setAccounts);
  const storeAddAccount = useStoreAccounts((store) => store.addAccount);
  const storeRemoveAccount = useStoreAccounts((store) => store.removeAccount);
  const storeUpdateAccount = useStoreAccounts((store) => store.updateAccount);
  const storeSetStatus = useStoreAccounts((store) => store.setStatus);

  useEffect(() => {
    if (status !== REQUEST_STATUS.idle) return;
    storeSetStatus(REQUEST_STATUS.loading);
    (async () => {
      const { ok, data } = await ServiceAccount.getAll();
      if (ok && data) {
        storeSetAccounts(data);
      }
      storeSetStatus(REQUEST_STATUS.finished);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAccount = async (
    account: Omit<Tables<"accounts">, "id" | "created_at">
  ) => {
    storeSetStatus(REQUEST_STATUS.loading);
    const { ok, data } = await ServiceAccount.create(account);
    if (ok && data) storeAddAccount(data);
    storeSetStatus(REQUEST_STATUS.finished);
    return ok;
  };

  const deleteAccount = async (id: string) => {
    storeSetStatus(REQUEST_STATUS.loading);
    const { ok } = await ServiceAccount.delete(id);
    if (ok) storeRemoveAccount(id);
    storeSetStatus(REQUEST_STATUS.finished);
    return ok;
  };

  const updateAccount = async (
    id: string,
    account: Omit<Tables<"accounts">, "id" | "created_at" | "user_id">
  ) => {
    storeSetStatus(REQUEST_STATUS.loading);
    const { ok, data } = await ServiceAccount.update(id, account);
    if (ok && data) storeUpdateAccount(data);
    storeSetStatus(REQUEST_STATUS.finished);
    return ok;
  };

  return {
    accounts,
    status,
    createAccount,
    deleteAccount,
    updateAccount,
  };
};

export default useAccounts;
