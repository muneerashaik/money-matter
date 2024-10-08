import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const TransactionModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative flex  w-[400px] flex-col justify-center rounded-xl bg-white px-4 py-6">
        <h1 className="text-xl font-semibold">Add Transaction</h1>
        <button onClick={onClose} className="absolute right-6 top-4">
          <IoClose className="text-xl text-slate-600" />
        </button>

        <p className="text-slate-500 text-xs mt-2">Add your transaction</p>

        <form className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">
              Transaction Name
            </label>
            <input
              type="text"
              className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
              placeholder="Enter Name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">
              Transaction Type
            </label>
            <select className="border-2 text-sm px-2 rounded-lg h-[46px] text-slate-800 outline-none">
              <option value="">Select Transaction Type</option>
              <option className="" value="Credit">
                Credit
              </option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">
              Category
            </label>
            <select className="border-2 text-sm px-2 rounded-lg h-[46px] text-slate-800 outline-none">
              <option value="">Select Category</option>
              <option className="" value="Food">
                Food
              </option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">Amount</label>
            <input
              type="number"
              className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
              placeholder="Enter Amount"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">Date</label>
            <input
              type="text"
              className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
              placeholder="Enter Date"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
