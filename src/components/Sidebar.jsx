import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";

import SidebarOption from "./SidebarOption";
import ConfirmModal from "./ConfirmModal";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import {
  API_PROFILE_URL,
  LOCALSTORAGE_KEY,
  SIDEBAR_OPTIONS,
  X_HASURA_ADMIN_SECRET,
  X_HASURA_ROLE,
} from "../contants";

const Sidebar = () => {
  const [alertModal, setAlertModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const url = API_PROFILE_URL;
      const res = await axios.get(url, {
        headers: {
          "x-hasura-admin-secret": X_HASURA_ADMIN_SECRET,
          "x-hasura-role": X_HASURA_ROLE,
          "x-hasura-user-id": userId,
        },
      });

      if (res.status === 200) {
        setUserData(res.data.users[0]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleLogout = () => {
    try {
      setLogoutLoading(true);
      localStorage.removeItem(LOCALSTORAGE_KEY);
      toast.success("Logout successful", { duration: 1000 });
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const options = SIDEBAR_OPTIONS;

  const renderHeader = () => {
    return (
      <h1
        style={{ color: "rgba(248, 154, 35, 1)" }}
        className="font-bold text-xl text-center"
      >
        Money{" "}
        <span className="" style={{ color: "rgba(2, 150, 156, 1)" }}>
          Matters
        </span>
      </h1>
    );
  };

  const renderOptions = () => {
    return (
      <ul className="flex flex-col w-full mt-6">
        {options.map((option) => (
          <SidebarOption key={option} option={option} />
        ))}
      </ul>
    );
  };

  const renderProfile = () => {
    return (
      <div className="flex gap-2 items-start px-2 mt-auto">
        <FaCircleUser className="text-2xl text-blue-600" />

        <div className="flex flex-col flex-grow text-xs">
          <p className="font-medium" style={{ color: "rgba(80, 88, 135, 1)" }}>
            {userData?.name}
          </p>
          <p
            className="font-medium"
            style={{ color: "rgba(113, 142, 191, 1)" }}
          >
            {userData?.email}
          </p>
        </div>

        <button>
          <LuLogOut
            onClick={() => setAlertModal(true)}
            color="rgba(113, 142, 191, 1)"
            className="text-lg "
          />
        </button>
      </div>
    );
  };

  const renderConfirmModal = () => {
    if (alertModal) {
      return (
        <ConfirmModal
          toggleModal={() => setAlertModal(false)}
          actionLoading={logoutLoading}
          action="logout"
          actionHandler={handleLogout}
        />
      );
    }
  };

  return (
    <div className="min-w-[200px] z-50 fixed flex flex-col bg-white py-4 min-h-dvh border-r-2 border-r-slate-100">
      {renderHeader()}

      {renderOptions()}

      {renderProfile()}

      {renderConfirmModal()}
    </div>
  );
};

export default Sidebar;
