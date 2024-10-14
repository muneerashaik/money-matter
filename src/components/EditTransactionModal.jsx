import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { TransactionContext } from "../context/transactionContext";
import LoadingButton from "./LoadingButton";
import { UserContext } from "../context/userContext";

const EditTransactionModal = ({ onClose, data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    amount: 0,
    date: "",
    id: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const { transactionsMutate, totalTransactionsMutate } =
    useContext(TransactionContext);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when modal is mounted
  }, []);

  useEffect(() => {
    setFormData({
      ...data,
      date: dayjs(new Date(data.date)).format("YYYY-MM-DDThh:mm"),
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const transactionValidation = () => {
    const { name, category, date, type, amount } = formData;
    if (!name) {
      toast.error("Please enter name");
      return false;
    } else if (!category) {
      toast.error("Please enter category");
      return false;
    } else if (!date) {
      toast.error("Please enter date");
      return false;
    } else if (!type) {
      toast.error("Please enter type");
      return false;
    } else if (!amount) {
      toast.error("Please enter amount");
      return false;
    }

    return true;
  };

  const handleEditTransaction = async (e) => {
    try {
      setEditLoading(true);
      e.preventDefault();
      if (transactionValidation()) {
        const { name, category, date, type, amount, id } = formData;
        const url =
          "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

        const res = await axios.post(
          url,
          {
            name,
            category,
            date,
            type,
            amount,
            id,
          },
          {
            headers: {
              "x-hasura-admin-secret":
                "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
              "x-hasura-role": "user",
              "x-hasura-user-id": userId,
            },
          }
        );

        if (res.status === 200) {
          toast.success("Transaction Updated");
          transactionsMutate();
          totalTransactionsMutate();
          setFormData({
            name: "",
            type: "",
            category: "",
            amount: 0,
            date: "",
          });
          onClose();
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(); // Close the modal after the animation
    }, 300); // Match the animation duration
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative flex  w-[400px] flex-col justify-center rounded-xl bg-white px-4 py-6 transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <h1 className="text-xl font-semibold">Update Transaction</h1>
        <button onClick={handleCloseModal} className="absolute right-6 top-4">
          <IoClose className="text-xl text-slate-600" />
        </button>

        <p className="text-slate-500 text-xs mt-2">Update your transaction</p>

        <form
          onSubmit={handleEditTransaction}
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
              className="border-2 appearance-none text-sm px-2 rounded-lg h-[46px] text-slate-800 outline-none"
            >
              <option value="">Select Transaction Type</option>
              <option className="" value="credit">
                Credit
              </option>
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
              className="border-2 text-sm px-2 rounded-lg appearance-none h-[46px] text-slate-800 outline-none"
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
              className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
              placeholder="Enter Amount"
              name="amount"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">Date</label>
            <input
              onChange={handleChange}
              value={formData.date}
              type="datetime-local"
              className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800  outline-none"
              placeholder="Enter Date"
              name="date"
            />
          </div>
          <LoadingButton action={"edit"} isLoading={editLoading} />
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
