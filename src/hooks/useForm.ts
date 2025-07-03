import React, { useRef, useState } from "react";

const useForm = <T extends Record<string, string | boolean | number>>(
  initialEntries: T
) => {
  const getInitialErrors = () => {
    return Object.keys(initialEntries).reduce((errors, key) => {
      errors[key as keyof T] = "";
      return errors;
    }, {} as { [K in keyof T]: string });
  };
  const [entries, setEntries] = useState<T>(initialEntries);
  const [errors, setErrors] = useState<{ [K in keyof T]: string }>(() =>
    getInitialErrors()
  );
  const isInvalid = useRef(false);
  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;
    setEntries((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement)?.checked
          : value,
    }));
  };
  const setValue = (inputKey: keyof T, value: string | boolean | number) => {
    setEntries((prevState) => ({
      ...prevState,
      [inputKey]: value,
    }));
  };
  const setError = (inputKey: keyof T, error: string) => {
    isInvalid.current = isInvalid.current || error !== "";
    setErrors((prevErrors) => {
      const updatedErrors: { [K in keyof T]: string } = prevErrors
        ? prevErrors
        : ({} as { [K in keyof T]: string });
      updatedErrors[inputKey] = error;
      return updatedErrors as { [K in keyof T]: string };
    });
  };
  const clearErrors = () => {
    setErrors(getInitialErrors());
    isInvalid.current = false;
  };
  const reset = () => {
    setEntries(initialEntries);
    clearErrors();
  };
  return {
    ...entries,
    form: {
      ...Object.keys(entries).reduce((acc, key) => {
        const inputKey = key as keyof T;
        acc[inputKey] = {
          id: inputKey,
          value: entries[inputKey],
          error: errors[inputKey] || "",
        };
        return acc;
      }, {} as { [K in keyof T]: { id: K; value: T[K]; error: string } }),
      reset,
      clearErrors,
      isValid: () => !isInvalid.current,
    },
    onChange,
    setValue,
    setEntries,
    setError,
  };
};

export default useForm;
