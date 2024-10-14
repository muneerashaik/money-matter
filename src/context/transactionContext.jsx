import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

import { UserContext } from "./userContext";
import {
  API_ALL_TRANSACTIONS,
  API_TOTAL_DEBIT_CREDIT_TRANSACTIONS,
  NUMBER_OF_TRANSACTIONS,
  X_HASURA_ADMIN_SECRET,
  X_HASURA_ROLE,
} from "../contants";

export const TransactionContext = createContext();

const userValidation = () => {
  const { userId } = useContext(UserContext);
  if (!userId) {
    throw new Error("userId is not defined");
  } else {
    return { userId };
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("transactions");
  const { userId } = userValidation();
  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState(null);

  const transactionsFetcher = async (url) => {
    try {
      const res = await axios({
        method: "get",
        baseURL: url,
        params: {
          limit: 100,
          offset: 0,
        },
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": X_HASURA_ADMIN_SECRET,
          "x-hasura-role": X_HASURA_ROLE,
          "x-hasura-user-id": userId,
        },
      });
      if (res.status === 200) {
        const { data } = res;
        const { transactions } = data;
        return transactions;
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const {
    data: transactions,
    isLoading: transactionsLoading,
    mutate: transactionsMutate,
    error: transactionsError,
  } = useSWR(API_ALL_TRANSACTIONS, transactionsFetcher);

  const totalDebitCreditTransactionsFetcher = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": X_HASURA_ADMIN_SECRET,
          "x-hasura-role": X_HASURA_ROLE,
          "x-hasura-user-id": userId,
        },
      });
      if (res.status === 200) {
        const { data } = res;
        const { totals_credit_debit_transactions } = data;
        return totals_credit_debit_transactions;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: totalDebitCreditTransactionsData,
    isLoading: totalDebitCreditTransactionsLoading,
    mutate: totalDebitCreditTransactionsMutate,
    error: totalDebitCreditTransactionsError,
  } = useSWR(
    API_TOTAL_DEBIT_CREDIT_TRANSACTIONS,
    totalDebitCreditTransactionsFetcher
  );

  let latestTransactions = [];

  if (!transactionsLoading) {
    latestTransactions = transactions
      ?.sort((first, second) => new Date(second.date) - new Date(first.date))
      .slice(0, NUMBER_OF_TRANSACTIONS);
  }

  return (
    <TransactionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        latestTransactions,
        transactionsLoading,
        transactions,
        transactionsMutate,
        totalDebitCreditTransactionsData,
        totalDebitCreditTransactionsLoading,
        totalDebitCreditTransactionsMutate,
        showEditTransactionModal,
        setShowEditTransactionModal,
        deleteTransactionId,
        setDeleteTransactionId,
        transactionsError,
        totalDebitCreditTransactionsError,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
