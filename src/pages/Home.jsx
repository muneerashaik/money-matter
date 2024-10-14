import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return (
    <div className="relative">
      <Sidebar />
      <div className="ml-[200px]">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
