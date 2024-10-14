import React, { useContext, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TransactionContext } from "../context/transactionContext";
import AddTransactionModal from "./AddTransactionModal";
import TransactionOption from "./TransactionOption";

const Header = () => {
  const { setType } = useContext(TransactionContext);
  const path = window.location.pathname;
  const [addTransactionModal, setAddTransactionModal] = useState(false);

  const renderHeaderName = () => {
    switch (path) {
      case "/dashboard":
        return <p className="font-semibold text-xl">Accounts</p>;

      case "/transactions":
        return <p className="font-semibold text-xl">Transactions</p>;
      default:
        break;
    }
  };

  const options = ["transactions", "credit", "debit"];

  return (
    <header className="min-h-[80px] py-4 px-4 border-b-2 relative">
      <div className="flex items-center justify-between">
        {renderHeaderName()}
        <button
          onClick={() => setAddTransactionModal(true)}
          className="bg-blue-600 text-white rounded-lg flex items-center p-1 pr-2"
        >
          <IoIosAdd className="text-2xl" />{" "}
          <span className="text-xs">Add Transaction</span>
        </button>
      </div>

      {path === "/transactions" && (
        <ul
          style={{ color: "rgba(113, 142, 191, 1)" }}
          className="flex items-center gap-6 text-sm absolute bottom-0 "
        >
          {options.map((option) => (
            <TransactionOption key={option} option={option} setType={setType} />
          ))}
        </ul>
      )}

      {addTransactionModal && (
        <AddTransactionModal onClose={() => setAddTransactionModal(false)} />
      )}
    </header>
  );
};

export default Header;
