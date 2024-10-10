import React from "react";
import { GoHomeFill } from "react-icons/go";
import { TbReceiptDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SidebarOption = ({ option }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const user = JSON.parse(localStorage.getItem("userData"));

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
          {user?.admin ? "All Transactions" : "Transactions"}
        </p>
      );
    } else if (option === "dashboard") {
      return <p className="font-medium text-base">Dashboard</p>;
    }
  };

  return (
    <li
      onClick={() => navigate("/" + option)}
      style={path === "/" + option ? { color: "rgba(45, 96, 255, 1)" } : {}}
      className="flex items-center gap-3 text-slate-500 relative pl-8 h-16 cursor-pointer"
    >
      {path === "/" + option && (
        <div className="w-2 h-14 bg-blue-600 absolute left-0 rounded-e-lg"></div>
      )}
      {renderIcon()}
      {renderOptionName()}
    </li>
  );
};

export default SidebarOption;
