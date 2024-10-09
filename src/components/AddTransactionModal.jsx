import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const AddTransactionModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
  });
  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = async (e) => {
    try {
      e.preventDefault();
      const { name, category, date, type, amount } = formData;
      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

      const res = await axios.post(
        url,
        {
          name,
          category,
          date,
          type,
          amount,
          user_id: userData.userId,
        },
        {
          headers: {
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": userData.userId,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Transaction Added");
        setFormData({
          name: "",
          type: "",
          category: "",
          amount: 0,
          date: "",
        });
        onClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative flex  w-[400px] flex-col justify-center rounded-xl bg-white px-4 py-6">
        <h1 className="text-xl font-semibold">Add Transaction</h1>
        <button onClick={onClose} className="absolute right-6 top-4">
          <IoClose className="text-xl text-slate-600" />
        </button>

        <p className="text-slate-500 text-xs mt-2">Add your transaction</p>

        <form
          onSubmit={handleAddTransaction}
          className="flex flex-col gap-3 mt-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">
              Transaction Name
            </label>
            <input
              name="name"
              type="text"
              className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
              placeholder="Enter Name"
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">
              Transaction Type
            </label>
            <select
              name="type"
              onChange={handleChange}
              value={formData.type}
              className="border-2 text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 outline-none w-full"
            >
              <option value="">Select Transaction Type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>

            <div className="pointer-events-none absolute top-9 right-3 flex items-center text-slate-600">
              <FiChevronDown className="w-5 h-5" />
            </div>
          </div>

          <div className="relative flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">
              Category
            </label>
            <select
              onChange={handleChange}
              value={formData.category}
              name="category"
              className="border-2 appearance-none text-sm px-2 rounded-lg h-[46px]  text-slate-800 outline-none"
            >
              <option value="">Select Category</option>
              <option className="" value="food">
                Food
              </option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
            </select>

            <div className="pointer-events-none absolute top-9 right-3 flex items-center text-slate-600">
              <FiChevronDown className="w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">Amount</label>
            <input
              onChange={handleChange}
              value={formData.amount}
              type="number"
              name="amount"
              className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
              placeholder="Enter Amount"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">Date</label>
            <input
              type="datetime-local"
              className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
              placeholder="Enter Date"
              onChange={handleChange}
              value={formData.date}
              name="date"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg text-white py-2 px-4 bg-blue-600 text-sm"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
