import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/"
          element={
            <div className="relative">
              <Sidebar />
              <div className="ml-[200px]">
                <Header />
                <Outlet />
              </div>
            </div>
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
