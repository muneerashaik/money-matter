import React, { useContext } from "react";
import { TransactionContext } from "../context/transactionContext";

const TransactionOption = ({ option, setType }) => {
  const { type } = useContext(TransactionContext);
  return (
    <li
      style={option === type ? { color: "rgba(45, 96, 255, 1)" } : {}}
      onClick={() => setType(option)}
      className="w-fit relative cursor-pointer"
    >
      <p className="pb-2 ">
        {option === "transactions" && "All "}
        <span className="first-letter:capitalize">{option}</span>
      </p>
      {option === type && (
        <div className="h-1 w-full rounded-t-md bg-blue-500 absolute bottom-0"></div>
      )}
    </li>
  );
};

export default TransactionOption;
