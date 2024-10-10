import React, { useContext, useRef } from "react";
import { TransactionContext } from "../context/transactionContext";

const TransactionOption = ({ option, setType }) => {
  const { type } = useContext(TransactionContext);
  const tabRef = useRef();

  const renderPointer = () => {
    if (option === type) {
      return (
        <div
          className={`tab h-1 transition-colors w-full rounded-t-md bg-blue-500 absolute bottom-0 `}
        ></div>
      );
    }
  };

  return (
    <li
      ref={tabRef}
      style={option === type ? { color: "rgba(45, 96, 255, 1)" } : {}}
      onClick={() => {
        setType(option);
      }}
      className="w-fit relative cursor-pointer"
    >
      <p className="pb-2 first-letter:capitalize">
        {option === "transactions" && "All "}
        <span className="">{option}</span>
      </p>
      {renderPointer()}
    </li>
  );
};

export default TransactionOption;
