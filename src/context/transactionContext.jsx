import { createContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {
  const [type, setType] = useState("transactions");

  return (
    <TransactionContext.Provider value={{ type, setType }}>
      {children}
    </TransactionContext.Provider>
  );
};
