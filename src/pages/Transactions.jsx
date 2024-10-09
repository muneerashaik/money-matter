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
import { TransactionContext } from "../context/transactionContext";
import ConfirmModal from "../components/ConfirmModal";
import EditTransactionModal from "../components/EditTransactionModal";
import toast from "react-hot-toast";

const Transactions = () => {
  const [deleteTransactionId, setDeleteTransactionId] = useState("");
  const [alertModal, setAlertModal] = useState(false);
  const {
    type: tabType,
    transactions,
    transactionsLoading,
    transactionsMutate,
  } = useContext(TransactionContext);
  const [editTransactionModal, setEditTransactionModal] = useState(false);
  const [editTransactionData, setEditTransactionData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
    id: "",
  });
  const userData = JSON.parse(localStorage.getItem("userData"));

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
        transactionsMutate();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAlertModal(false);
      setDeleteTransactionId("");
    }
  };

  let transactionsData = [];
  transactions?.forEach(
    ({ transaction_name, id, category, amount, date, type }) => {
      if (tabType === "transactions" || tabType === type) {
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
              <p className="text-slate-400">
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
      return null;
    }
  );

  const RenderTransactions = () => {
    return (
      <>
        {transactionsLoading ? (
          <p>loading...</p>
        ) : (
          <>
            {transactionsData?.length === 0 ? (
              <p>Empty!!</p>
            ) : (
              <ul className="bg-white rounded-xl p-2 px-4 flex flex-col gap-2 mt-2">
                {transactionsData.map((t) => t)}
              </ul>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100">
      {RenderTransactions(tabType)}
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
            <div className="bg-orange-100 h-[48px] w-[54px] rounded-full flex justify-center items-center">
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

export default Transactions;
