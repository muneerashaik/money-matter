import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmModal = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative flex w-[440px] flex-col justify-center rounded-xl bg-white px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default ConfirmModal;
