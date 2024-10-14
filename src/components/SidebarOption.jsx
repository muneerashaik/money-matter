import React from "react";
import { GoHomeFill } from "react-icons/go";
import { TbReceiptDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SidebarOption = ({ option }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  let admin;
  if (localStorage.getItem("userData")) {
    admin = JSON.parse(localStorage.getItem("userData")).admin;
  }

  const renderIcon = () => {
    if (option === "dashboard") {
      return <GoHomeFill className="text-xl" />;
    } else if (option === "transactions") {
      return <TbReceiptDollar className="text-xl" />;
    }
  };

  const renderOptionName = () => {
    if (option === "transactions") {
      return (
        <p className="font-medium text-base">
          {admin ? "All Transactions" : "Transactions"}
        </p>
      );
    } else if (option === "dashboard") {
      return <p className="font-medium text-base">Dashboard</p>;
    }
  };

  const renderPointer = () => {
    if (path === "/" + option) {
      return (
        <div className="w-2 h-14 bg-blue-600 absolute left-0 rounded-e-lg"></div>
      );
    }
  };

  return (
    <li
      onClick={() => navigate("/" + option)}
      style={path === "/" + option ? { color: "rgba(45, 96, 255, 1)" } : {}}
      className="flex items-center gap-3 text-slate-500 relative pl-8 h-16 cursor-pointer"
    >
      {renderPointer()}
      {renderIcon()}
      {renderOptionName()}
    </li>
  );
};

export default SidebarOption;
