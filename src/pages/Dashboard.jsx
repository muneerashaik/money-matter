import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import creditImage from "../assets/credit.png";
import debitImage from "../assets/debit.png";
import ConfirmModal from "../components/ConfirmModal";
import EditTransactionModal from "../components/EditTransactionModal";
import { TransactionContext } from "../context/transactionContext";
import TransactionItem from "../components/TransactionItem";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import ChartComponent from "./Chart";

const Dashboard = () => {
  const {
    latestTransactions,
    transactionsLoading,
    transactionsMutate,
    totalTransactionsData,
    totalTransactionsLoading,
    totalTransactionsMutate,
    deleteTransactionId,
    setDeleteTransactionId,
    editTransactionModal,
    setEditTransactionModal,
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
      setTimeout(() => {
        setAlertModal(false);
      }, 1000);
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
        <div className="flex items-center justify-center h-[100px]">
          <Loader />
        </div>
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
        Last Transactions
      </h1>

      {transactionsLoading ? (
        <div className="flex items-center justify-center h-[60dvh]">
          <Loader />
        </div>
      ) : (
        <>
          {transactionsLoading === false && latestTransactions?.length === 0 ? (
            <EmptyView />
          ) : (
            <ul className="bg-white rounded-xl p-2 px-4 flex flex-col gap-2 mt-2">
              {transactionsData.map((t) => t)}
            </ul>
          )}
        </>
      )}

      <ChartComponent />

      {alertModal && (
        <ConfirmModal
          toggleModal={() => setAlertModal(false)}
          setActionId={setDeleteTransactionId}
          actionLoading={deleteLoading}
          action={"delete"}
          actionHandler={() => handleTransactionDelete()}
        />
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
