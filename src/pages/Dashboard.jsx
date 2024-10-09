import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import creditImage from "../assets/credit.png";
import debitImage from "../assets/debit.png";
import ConfirmModal from "../components/ConfirmModal";
import { IoWarningOutline, IoClose } from "react-icons/io5";
import EditTransactionModal from "../components/EditTransactionModal";
import { TransactionContext } from "../context/transactionContext";
import TransactionItem from "../components/TransactionItem";
import { TailSpin } from "react-loader-spinner";

const Dashboard = () => {
  const [editTransactionModal, setEditTransactionModal] = useState(false);
  const {
    latestTransactions,
    transactionsLoading,
    transactionsMutate,
    totalTransactionsData,
    totalTransactionsLoading,
    totalTransactionsMutate,
  } = useContext(TransactionContext);
  const [editTransactionData, setEditTransactionData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
    id: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState(0);
  const [alertModal, setAlertModal] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleTransactionDelete = async () => {
    try {
      setDeleteLoading(true);
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
        totalTransactionsMutate();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteTransactionId("");
      setDeleteLoading(false);
    }
  };

  let transactionsData = [];
  latestTransactions?.forEach(
    ({ transaction_name, id, category, amount, date, type }) => {
      transactionsData.push(
        <TransactionItem
          key={id}
          data={{
            transaction_name,
            id,
            category,
            amount,
            date,
            type,
          }}
          setEditTransactionData={setEditTransactionData}
          setEditTransactionModal={setEditTransactionModal}
          setAlertModal={setAlertModal}
          setDeleteTransactionId={setDeleteTransactionId}
        />
      );
    }
  );

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100">
      {totalTransactionsLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center gap-4 justify-around mx-auto">
          {totalTransactionsData?.map((t, index) => {
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
                  className="bg-red-600 text-white rounded-xl py-2  w-[120px] flex items-center justify-center"
                >
                  {deleteLoading ? (
                    <TailSpin
                      visible={true}
                      height="20"
                      width="20"
                      color="white"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <p className="text-sm">Yes, Delete</p>
                  )}
                </button>
                <button
                  onClick={() => setAlertModal(false)}
                  className="border-slate-200 border-2 w-[120px] text-black rounded-xl py-2 px-4"
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
