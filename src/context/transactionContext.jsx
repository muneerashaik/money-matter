import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {
  const [type, setType] = useState("transactions");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const transactionsFetcher = async (url) => {
    try {
      const res = await axios({
        method: "get",
        baseURL: url,
        params: {
          limit: 1000,
          offset: 0,
        },
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": userData.userId,
        },
      });
      if (res.status === 200) {
        return res.data.transactions;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: transactions,
    isLoading: transactionsLoading,
    mutate,
  } = useSWR(
    "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
    transactionsFetcher
  );

  let latestTransactions = [];

  if (!transactionsLoading) {
    latestTransactions = transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  }

  return (
    <TransactionContext.Provider
      value={{
        type,
        setType,
        latestTransactions,
        transactionsLoading,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
