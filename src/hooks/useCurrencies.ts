import { REQUEST_STATUS } from "@/lib/consts/request";
import ServiceCurrency from "@/services/ServiceCurrency";
import useStoreCurrencies from "@/stores/useStoreCurrencies";
import { useEffect } from "react";

const useCurrencies = () => {
  const currencies = useStoreCurrencies((store) => store.currencies);
  const status = useStoreCurrencies((store) => store.status);
  const storeSetCurrencies = useStoreCurrencies((store) => store.setCurrencies);
  const storeSetStatus = useStoreCurrencies((store) => store.setStatus);

  useEffect(() => {
    if (status !== REQUEST_STATUS.idle) return;
    storeSetStatus(REQUEST_STATUS.loading);
    (async () => {
      const { ok, data } = await ServiceCurrency.getAll();
      if (ok && data) {
        storeSetCurrencies(data);
      }
      storeSetStatus(REQUEST_STATUS.finished);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currencies,
    status,
  };
};

export default useCurrencies;
