import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { UserContext } from "./userContext";

export const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {
  const [type, setType] = useState("transactions");
  const { userId } = useContext(UserContext);

  const transactionsFetcher = async (url) => {
    try {
      if (userId) {
        const res = await axios({
          method: "get",
          baseURL: url,
          params: {
            limit: 100,
            offset: 0,
          },
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": userId,
          },
        });
        if (res.status === 200) {
          return res.data.transactions;
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: transactions,
    isLoading: transactionsLoading,
    mutate: transactionsMutate,
  } = useSWR(
    "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
    transactionsFetcher
  );

  const fetchTotals = async (url) => {
    try {
      if (userId) {
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": userId,
          },
        });
        if (res.status === 200) {
          return res.data.totals_credit_debit_transactions;
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: totalTransactionsData,
    isLoading: totalTransactionsLoading,
    mutate: totalTransactionsMutate,
  } = useSWR(
    "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
    fetchTotals
  );

  useEffect(() => {
    transactionsMutate();
    totalTransactionsMutate();
  }, [userId]);

  let latestTransactions = [];

  if (!transactionsLoading) {
    latestTransactions = transactions
      ?.sort((a, b) => new Date(b.date) - new Date(a.date))
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
        transactionsMutate,
        totalTransactionsData,
        totalTransactionsLoading,
        totalTransactionsMutate,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
