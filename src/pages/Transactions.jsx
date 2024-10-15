import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { TransactionContext } from "../context/transactionContext";
import ConfirmModal from "../components/ConfirmModal";
import EditTransactionModal from "../components/EditTransactionModal";
import TransactionItem from "../components/TransactionItem";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import {
  API_DELETE_TRANSACTION,
  X_HASURA_ADMIN_SECRET,
  X_HASURA_ROLE,
} from "../contants";
import { UserContext } from "../context/userContext";
import ErrorPage from "../components/ErrorPage";

const Transactions = () => {
  const [alertModal, setAlertModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    activeTab,
    transactions,
    isTransactionsLoading,
    transactionsMutate,
    totalDebitCreditTransactionsMutate,
    deleteTransactionId,
    setDeleteTransactionId,
    showEditTransactionModal,
    setShowEditTransactionModal,
    transactionsError,
  } = useContext(TransactionContext);

  const [editTransactionData, setEditTransactionData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
    id: "",
  });

  const { userId } = useContext(UserContext);

  const handleTransactionDelete = async () => {
    try {
      setDeleteLoading(true);
      const url = API_DELETE_TRANSACTION + deleteTransactionId;

      const res = await axios.delete(url, {
        headers: {
          "x-hasura-admin-secret": X_HASURA_ADMIN_SECRET,
          "x-hasura-role": X_HASURA_ROLE,
          "x-hasura-user-id": userId,
        },
      });

      if (res.status === 200) {
        toast.success("Transaction deleted");
        transactionsMutate();
        totalDebitCreditTransactionsMutate();
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
      if (activeTab === "transactions" || activeTab === type) {
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
            setShowEditTransactionModal={setShowEditTransactionModal}
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
        {isTransactionsLoading ? (
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

  const renderConfirmModal = () => {
    if (alertModal) {
      return (
        <ConfirmModal
          toggleModal={() => setAlertModal(false)}
          setActionId={setDeleteTransactionId}
          actionLoading={deleteLoading}
          action={"delete"}
          actionHandler={() => handleTransactionDelete()}
        />
      );
    }
  };

  const renderEditTransactionModal = () => {
    if (showEditTransactionModal) {
      return (
        <EditTransactionModal
          onClose={() => {
            setShowEditTransactionModal(false);
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
      );
    }
  };

  if (transactionsError) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100">
      {RenderTransactions(activeTab)}
      {renderEditTransactionModal()}
      {renderConfirmModal()}
    </div>
  );
};

export default Transactions;
