import React from "react";
import { GoHomeFill } from "react-icons/go";
import { TbReceiptDollar } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const path = window.location.pathname;
  const navigate = useNavigate();

  return (
    <div className="min-w-[200px] flex flex-col bg-white py-4 min-h-dvh border-r-2 border-r-slate-100">
      <h1
        style={{ color: "rgba(248, 154, 35, 1)" }}
        className="font-bold text-xl text-center"
      >
        Money{" "}
        <span className="" style={{ color: "rgba(2, 150, 156, 1)" }}>
          Matters
        </span>
      </h1>

      <ul className="flex flex-col w-full mt-6">
        <li
          onClick={() => navigate("/dashboard")}
          style={path === "/dashboard" ? { color: "rgba(45, 96, 255, 1)" } : {}}
          className="flex items-center gap-3 text-slate-500 relative pl-8 h-16 cursor-pointer"
        >
          {path === "/dashboard" && (
            <div className="w-2 h-14 bg-blue-600 absolute left-0 rounded-e-lg"></div>
          )}
          <GoHomeFill className="text-xl" />
          <p className="font-medium text-base">Dashboard</p>
        </li>
        <li
          onClick={() => navigate("/transactions")}
          style={
            path === "/transactions" ? { color: "rgba(45, 96, 255, 1)" } : {}
          }
          className="flex items-center gap-2 text-slate-500 relative pl-8 h-16 cursor-pointer"
        >
          {path === "/transactions" && (
            <div className="w-2 h-14 bg-blue-600 absolute left-0 rounded-e-lg"></div>
          )}
          <TbReceiptDollar className="text-xl" />
          <p className="text-base font-medium">Transactions</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
