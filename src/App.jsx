import React from "react";
import { Route, Routes } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const App = () => {
  const Wrapper = ({ children }) => {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Header />
          {children}
        </div>
        <Toaster position="top-center" />
      </div>
    );
  };

  return (
    <Routes>
      <Route
        path="/transactions"
        element={
          <Wrapper>
            <Transactions />
          </Wrapper>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Wrapper>
            <Dashboard />
          </Wrapper>
        }
      />
    </Routes>
  );
};

export default App;
