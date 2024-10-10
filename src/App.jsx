import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import { TransactionContextProvider } from "./context/transactionContext";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login admin={false} />} />
        <Route path="/admin/login" element={<Login admin={true} />} />

        <Route
          path="/"
          element={
            <TransactionContextProvider>
              <div className="relative">
                <Sidebar />
                <div className="ml-[200px]">
                  <Header />
                  <Outlet />
                </div>
              </div>
            </TransactionContextProvider>
          }
        >
          <Route path="transactions" element={<Transactions />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster reverseOrder={false} position="top-center" />
    </>
  );
};

export default App;
