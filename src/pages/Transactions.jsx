import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
  IoClose,
  IoWarningOutline,
} from "react-icons/io5";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import useSWR from "swr";
import { TransactionContext } from "../context/transactionContext";
import ConfirmModal from "../components/ConfirmModal";

const Transactions = () => {
  const [transactionId, setTransactionId] = useState(0);
  const [alertModal, setAlertModal] = useState(false);
  const { type } = useContext(TransactionContext);

  const fetchTransactions = async (url) => {
    try {
      const res = await axios({
        method: "get",
        baseURL: url,
        params: {
          limit: 10,
          offset: 2,
        },
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": 1,
        },
      });
      if (res.status === 200) {
        return res.data.transactions;
      }
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
    }
  };

  const {
    data: transactions,
    isLoading: transactionsLoading,
    error,
  } = useSWR(
    "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
    fetchTransactions
  );

  const handleTransactionEdit = () => {
    try {
    } catch (error) {}
  };

  const handleTransactionDelete = () => {
    try {
      console.log(transactionId);
    } catch (error) {}
  };

  const RenderTransactions = (tabType) => {
    return (
      <>
        {transactionsLoading ? (
          <p>loading...</p>
        ) : (
          <ul className="bg-white rounded-xl p-2 px-4 flex flex-col gap-2 mt-2">
            {transactions?.map(
              (
                { transaction_name, id, category, amount, date, type },
                index
              ) => {
                if (tabType === "transactions" || tabType === type) {
                  return (
                    <li
                      className={`flex items-center gap-2 border-b-2 p-2 text-sm last:border-none`}
                      key={id}
                    >
                      {type === "credit" ? (
                        <IoArrowUpCircleOutline className="text-xl text-green-500" />
                      ) : (
                        <IoArrowDownCircleOutline className="text-xl text-red-500" />
                      )}
                      <p className="flex-grow">{transaction_name}</p>
                      <div className="flex items-start justify-between gap-3 max-w-[500px] w-2/4">
                        <p className="text-slate-400">{category}</p>
                        <p className="text-slate-400">
                          {dayjs(date).format("YY MMM, hh:mm A")}
                        </p>
                        <p className="font-semibold">
                          {type === "credit" ? (
                            <span className="text-green-500">+${amount}</span>
                          ) : (
                            <span className="text-red-500">-${amount}</span>
                          )}
                        </p>
                        <button onClick={() => handleTransactionEdit(id)}>
                          <MdOutlineModeEdit className="text-xl text-blue-400" />
                        </button>
                        <button
                          onClick={() => {
                            setAlertModal(true);
                            setTransactionId(id);
                          }}
                        >
                          <MdDeleteOutline className="text-xl text-red-400" />
                        </button>
                      </div>
                    </li>
                  );
                }
                return null; // If the tab doesn't match, return null
              }
            )}
            {alertModal && (
              <ConfirmModal>
                <button
                  onClick={() => setAlertModal(false)}
                  className="absolute right-6 top-4"
                >
                  <IoClose className="text-xl text-slate-600" />
                </button>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 h-[46px] w-[46px] rounded-full flex justify-center items-center">
                    <div className="bg-orange-200 h-[36px] w-[36px] rounded-full flex justify-center items-center">
                      <IoWarningOutline className="text-orange-600 text-2xl" />
                    </div>
                  </div>

                  <div className="flex flex-col mt-[-4px]">
                    <p className="font-semibold text-lg">
                      Are you sure you want to delete?
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      This transaction will be deleted immediately. You can’t
                      undo this action.
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <button
                        onClick={handleTransactionDelete}
                        className="bg-red-600 text-white rounded-xl py-2 px-4"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setAlertModal(false)}
                        className="border-slate-200 border-2 text-black rounded-xl py-2 px-4"
                      >
                        No, Leave it
                      </button>
                    </div>
                  </div>
                </div>
              </ConfirmModal>
            )}
          </ul>
        )}
      </>
    );
  };

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100">
      {RenderTransactions(type)}
    </div>
  );
};

export default Transactions;
