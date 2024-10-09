import React, { useContext, useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TransactionContext } from "../context/transactionContext";
import AddTransactionModal from "./AddTransactionModal";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { type, setType } = useContext(TransactionContext);
  const path = window.location.pathname;
  const [addTransactionModal, setAddTransactionModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/login");
    }
  }, []);

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
          <li
            style={
              type === "transactions" ? { color: "rgba(45, 96, 255, 1)" } : {}
            }
            onClick={() => setType("transactions")}
            className="w-fit relative cursor-pointer"
          >
            <p className="pb-2 ">All Transactions</p>
            {type === "transactions" && (
              <div className="h-1 w-full rounded-t-md bg-blue-500 absolute bottom-0"></div>
            )}
          </li>
          <li
            style={type === "debit" ? { color: "rgba(45, 96, 255, 1)" } : {}}
            onClick={() => setType("debit")}
            className="w-fit relative cursor-pointer"
          >
            <p className="pb-2 ">Debit</p>
            {type === "debit" && (
              <div className="h-1 w-full rounded-t-md bg-blue-500 absolute bottom-0"></div>
            )}
          </li>
          <li
            style={type === "credit" ? { color: "rgba(45, 96, 255, 1)" } : {}}
            onClick={() => setType("credit")}
            className="w-fit relative cursor-pointer"
          >
            <p className="pb-2 ">Credit</p>
            {type === "credit" && (
              <div className="h-1 w-full rounded-t-md bg-blue-500 absolute bottom-0"></div>
            )}
          </li>
        </ul>
      )}

      {addTransactionModal && (
        <AddTransactionModal onClose={() => setAddTransactionModal(false)} />
      )}
    </header>
  );
};

export default Header;
