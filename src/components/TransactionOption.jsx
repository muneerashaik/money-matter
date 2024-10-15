import React, { useContext } from "react";

import { TransactionContext } from "../context/transactionContext";
import { TAB_OPTIONS } from "../contants";

const TransactionOption = ({ option }) => {
  const { setActiveTab, activeTab } = useContext(TransactionContext);

  const renderPointer = () => {
    if (option === activeTab) {
      return (
        <div
          className={`tab h-1 transition-colors w-full rounded-t-md bg-blue-500 absolute bottom-0 `}
        ></div>
      );
    }
  };

  return (
    <li
      style={option === activeTab ? { color: "rgba(45, 96, 255, 1)" } : {}}
      className="w-fit relative cursor-pointer"
      onClick={() => {
        setActiveTab(option);
      }}
    >
      <p className="pb-2 first-letter:capitalize">
        {option === TAB_OPTIONS.transactions && "All "}
        <span className="">{option}</span>
      </p>
      {renderPointer()}
    </li>
  );
};

export default TransactionOption;
