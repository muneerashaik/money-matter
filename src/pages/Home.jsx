import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { TransactionContextProvider } from "../context/transactionContext";
import { LOCALSTORAGE_KEY } from "../contants";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
    if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
      navigate("/login");
    }
  }, []);

  if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    return (
      <TransactionContextProvider>
        <div className="relative">
          <Sidebar />
          <div className="ml-[200px]">
            <Header />
            <Outlet />
          </div>
        </div>
      </TransactionContextProvider>
    );
  }
  return <></>;
};

export default Home;
