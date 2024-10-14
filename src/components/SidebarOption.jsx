import React from "react";
import { GoHomeFill } from "react-icons/go";
import { TbReceiptDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SidebarOption = ({ option }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const { admin } = JSON.parse(localStorage.getItem("userData"));
  const currentPath = "/" + option;

  const renderOption = () => {
    switch (option) {
      case "dashboard":
        return (
          <>
            <GoHomeFill className="text-xl" />
            <p className="font-medium text-base">Dashboard</p>
          </>
        );
      case "transactions":
        return (
          <>
            <TbReceiptDollar className="text-xl" />
            <p className="font-medium text-base">
              {admin ? "All Transactions" : "Transactions"}
            </p>
          </>
        );
      default:
        return;
    }
  };

  const renderPointer = () => {
    if (path === currentPath) {
      return (
        <div className="w-2 h-14 bg-blue-600 absolute left-0 rounded-e-lg"></div>
      );
    }
  };

  return (
    <li
      onClick={() => navigate(currentPath)}
      style={path === currentPath ? { color: "rgba(45, 96, 255, 1)" } : {}}
      className="flex items-center gap-3 text-slate-500 relative pl-8 h-16 cursor-pointer"
    >
      {renderPointer()}
      {renderOption()}
    </li>
  );
};

export default SidebarOption;
