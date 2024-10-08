import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useSWR from "swr";
import creditImage from "../assets/credit.png";
import debitImage from "../assets/debit.png";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import dayjs from "dayjs";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "../components/ConfirmModal";
import { IoWarningOutline, IoClose } from "react-icons/io5";

const Dashboard = () => {
  const [totalTransactions, setTotalTransactions] = useState({
    credit: 0,
    debit: 0,
  });
  const [transactionId, setTransactionId] = useState(0);
  const [alertModal, setAlertModal] = useState(false);
  const [transactionsLoading, setTransactionsLoading] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchTotals = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": 1,
        },
      });

      if (res.status === 200) {
        return res.data.totals_credit_debit_transactions;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { data, isLoading, error } = useSWR(
    "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
    fetchTotals
  );

  useEffect(() => {
    if (!isLoading) {
      setTotalTransactions({
        credit: data[0]?.sum,
        debit: data[1]?.sum,
      });
    }
  }, [isLoading]);

  const fetchTransactions = async () => {
    try {
      setTransactionsLoading(true);
      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
      const res = await axios({
        method: "get",
        baseURL: url,
        params: {
          limit: 3,
          offset: 0,
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
        setTransactions(res.data.transactions);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { duration: 1000 });
    } finally {
      setTransactionsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionEdit = () => {
    try {
    } catch (error) {}
  };

  const handleTransactionDelete = () => {
    try {
      console.log(transactionId);
    } catch (error) {}
  };

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center gap-4 justify-around mx-auto">
          <div className="flex items-start bg-white rounded-xl p-2 pl-6 justify-between w-2/4 ">
            <div>
              <p
                className="text-3xl font-semibold"
                style={{ color: "rgba(22, 219, 170, 1)" }}
              >
                ${totalTransactions?.credit}
              </p>
              <p
                className="text-sm"
                style={{ color: "rgba(113, 142, 191, 1)" }}
              >
                Credit
              </p>
            </div>

            <img className="h-24" src={creditImage} alt="credit" />
          </div>
          <div className="flex items-start bg-white rounded-xl p-2 pl-6 justify-between w-2/4">
            <div>
              <p
                className="text-3xl font-semibold"
                style={{ color: "rgba(254, 92, 115, 1)" }}
              >
                ${totalTransactions?.debit}
              </p>
              <p
                className="text-sm"
                style={{ color: "rgba(113, 142, 191, 1)" }}
              >
                Debit
              </p>
            </div>

            <img className="h-24" src={debitImage} alt="debit" />
          </div>
        </div>
      )}

      <h1
        className="font-semibold mt-4"
        style={{ color: "rgba(51, 59, 105, 1)" }}
      >
        Last Transaction
      </h1>

      {transactionsLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="bg-white rounded-xl p-2 px-4 flex flex-col gap-2 mt-2">
          {transactions?.map((transaction, index) => {
            const { transaction_name, id, category, amount, date, type } =
              transaction;
            return (
              <li
                className={`flex items-center gap-2 border-b-2 p-2 text-sm ${
                  index === transactions.length - 1 ? "border-none" : ""
                }`}
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
                  <button onClick={() => handleEdit(id)}>
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
          })}
        </ul>
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
                This transaction will be deleted immediately. You can’t undo
                this action.
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
    </div>
  );
};

export default Dashboard;
