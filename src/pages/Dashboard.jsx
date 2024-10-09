import React, { useContext, useEffect, useState } from "react";
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
import EditTransactionModal from "../components/EditTransactionModal";
import { TransactionContext } from "../context/transactionContext";

const Dashboard = () => {
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [editTransactionModal, setEditTransactionModal] = useState(false);
  const { latestTransactions, transactionsLoading } =
    useContext(TransactionContext);
  const [editTransactionData, setEditTransactionData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
    id: "",
  });

  const [deleteTransactionId, setDeleteTransactionId] = useState(0);
  const [alertModal, setAlertModal] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const fetchTotals = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": userData.userId,
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
      setTotalTransactions(data);
    }
  }, [isLoading]);

  // const fetchTransactions = async () => {
  //   try {
  //     setTransactionsLoading(true);
  //     const url =
  //       "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
  //     const res = await axios({
  //       method: "get",
  //       baseURL: url,
  //       params: {
  //         limit: 1000,
  //         offset: 0,
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-hasura-admin-secret":
  //           "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
  //         "x-hasura-role": "user",
  //         "x-hasura-user-id": userData.userId,
  //       },
  //     });

  //     if (res.status === 200) {
  //       setTransactions(res.data.transactions);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message, { duration: 1000 });
  //   } finally {
  //     setTransactionsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);

  const handleTransactionDelete = async () => {
    try {
      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id=" +
        deleteTransactionId;

      const res = await axios.delete(url, {
        headers: {
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": userData.userId,
        },
      });

      if (res.status === 200) {
        toast.success("Transaction deleted");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAlertModal(false);
      setDeleteTransactionId("");
    }
  };

  let transactionsData = [];
  latestTransactions?.forEach(
    ({ transaction_name, id, category, amount, date, type }) => {
      transactionsData.push(
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
            <p className="text-slate-400 w-1/4 first-letter:capitalize">
              {category}
            </p>
            <p className="text-slate-400 ">
              {dayjs(date).format("DD MMM YY, hh:mm A")}
            </p>
            <p className="font-semibold">
              {type === "credit" ? (
                <span className="text-green-500">+${amount}</span>
              ) : (
                <span className="text-red-500">-${amount}</span>
              )}
            </p>
            <button
              onClick={() => {
                setEditTransactionData({
                  category,
                  amount,
                  date,
                  name: transaction_name,
                  type,
                  id,
                });
                setEditTransactionModal(true);
              }}
            >
              <MdOutlineModeEdit className="text-xl text-blue-400" />
            </button>
            <button
              onClick={() => {
                setAlertModal(true);
                setDeleteTransactionId(id);
              }}
            >
              <MdDeleteOutline className="text-xl text-red-400" />
            </button>
          </div>
        </li>
      );
    }
  );

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center gap-4 justify-around mx-auto">
          {totalTransactions.map((t, index) => {
            return (
              <div
                key={index}
                className="flex items-start bg-white rounded-xl p-2 pl-6 justify-between w-2/4 "
              >
                <div>
                  <p
                    className="text-3xl font-semibold"
                    style={
                      t.type === "credit"
                        ? { color: "rgba(22, 219, 170, 1)" }
                        : { color: "rgba(254, 92, 115, 1)" }
                    }
                  >
                    ${t.sum}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(113, 142, 191, 1)" }}
                  >
                    {t.type}
                  </p>
                </div>

                {t.type === "credit" ? (
                  <img className="h-24" src={creditImage} alt="credit" />
                ) : (
                  <img className="h-24" src={debitImage} alt="credit" />
                )}
              </div>
            );
          })}
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
        <>
          {latestTransactions?.length === 0 ? (
            <p>Empty!!</p>
          ) : (
            <ul className="bg-white rounded-xl p-2 px-4 flex flex-col gap-2 mt-2">
              {transactionsData.map((t) => t)}
            </ul>
          )}
        </>
      )}

      {alertModal && (
        <ConfirmModal>
          <button
            onClick={() => {
              setAlertModal(false);
              setDeleteTransactionId("");
            }}
            className="absolute right-6 top-4"
          >
            <IoClose className="text-xl text-slate-600" />
          </button>

          <div className="flex items-start gap-4">
            <div className="bg-orange-100 h-[46px] w-[54px] rounded-full flex justify-center items-center">
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

      {editTransactionModal && (
        <EditTransactionModal
          onClose={() => {
            setEditTransactionModal(false);
            setEditTransactionData({
              name: "",
              type: "",
              category: "",
              amount: 0,
              date: "",
              id: "",
            });
          }}
          data={editTransactionData}
        />
      )}
    </div>
  );
};

export default Dashboard;
