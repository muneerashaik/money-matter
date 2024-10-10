import axios from "axios";
import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/transactionContext";
import ConfirmModal from "../components/ConfirmModal";
import EditTransactionModal from "../components/EditTransactionModal";
import toast from "react-hot-toast";
import TransactionItem from "../components/TransactionItem";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";

const Transactions = () => {
  const [deleteTransactionId, setDeleteTransactionId] = useState("");
  const [alertModal, setAlertModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    type: tabType,
    transactions,
    transactionsLoading,
    transactionsMutate,
    totalTransactionsMutate,
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
      setDeleteLoading(false);
      setDeleteTransactionId("");
      setTimeout(() => {
        setAlertModal(false);
      }, 1000);
    }
  };

  let transactionsData = [];
  transactions?.forEach(
    ({ transaction_name, id, category, amount, date, type }) => {
      if (tabType === "transactions" || tabType === type) {
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
      return null;
    }
  );

  const RenderTransactions = () => {
    return (
      <>
        {transactionsLoading ? (
          <div className="flex items-center justify-center h-[60dvh]">
            <Loader />
          </div>
        ) : (
          <>
            {transactionsData?.length === 0 ? (
              <EmptyView />
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
        <ConfirmModal
          toggleModal={() => setAlertModal(false)}
          setActionId={setDeleteTransactionId}
          actionLoading={deleteLoading}
          action={"delete"}
          actionHandler={() => handleTransactionDelete()}
        />
      )}
    </div>
  );
};

export default Transactions;
