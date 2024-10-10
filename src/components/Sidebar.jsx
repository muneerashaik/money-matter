import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import SidebarOption from "./SidebarOption";

const Sidebar = () => {
  const [alertModal, setAlertModal] = useState(false);
  const path = window.location.pathname;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const user = JSON.parse(localStorage.getItem("userData"));

  const fetchUserProfile = async () => {
    try {
      const url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
      const res = await axios.get(url, {
        headers: {
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": user.userId,
        },
      });

      if (res.status === 200) {
        setUserData(res.data.users[0]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userData");
      toast.success("Logout successful", { duration: 1000 });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const options = ["dashboard", "transactions"];

  return (
    <div className="min-w-[200px] z-50 fixed flex flex-col bg-white py-4 min-h-dvh border-r-2 border-r-slate-100">
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
        {options.map((option) => (
          <SidebarOption key={option} option={option} />
        ))}
      </ul>

      <div className="flex gap-2 items-start px-2 mt-auto">
        <FaCircleUser className="text-2xl text-blue-600" />

        <div className="flex flex-col flex-grow text-xs">
          <p className="font-medium" style={{ color: "rgba(80, 88, 135, 1)" }}>
            {userData.name}
          </p>
          <p
            className="font-medium"
            style={{ color: "rgba(113, 142, 191, 1)" }}
          >
            {userData.email}
          </p>
        </div>

        <LuLogOut
          onClick={() => setAlertModal(true)}
          color="rgba(113, 142, 191, 1)"
          className="text-lg cursor-pointer"
        />
      </div>
      {alertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative flex w-[440px] flex-col justify-center rounded-xl bg-white px-4 py-6">
            <button
              onClick={() => setAlertModal(false)}
              className="absolute right-6 top-4"
            >
              <IoClose className="text-xl text-slate-600" />
            </button>

            <div className="flex items-start gap-4">
              <div className="bg-orange-100 h-[46px] w-[46px] rounded-full flex justify-center items-center">
                <div className="bg-orange-200 h-[36px] w-[36px] rounded-full flex justify-center items-center">
                  <LuLogOut className="text-orange-600 text-2xl" />
                </div>
              </div>

              <div className="flex flex-col mt-[-4px]">
                <p
                  style={{ color: "rgba(51, 59, 105, 1)" }}
                  className="font-semibold text-lg"
                >
                  Are you sure you want to Logout?
                </p>
                <p
                  style={{ color: "rgba(80, 88, 135, 1)" }}
                  className="text-slate-500 text-xs mt-1"
                >
                  You will be logged out immediately.
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white rounded-xl py-2 px-4"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setAlertModal(false)}
                    className="border-slate-200 border-2 text-black rounded-xl py-2 px-4"
                  >
                    No, Leave it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
