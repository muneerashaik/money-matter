import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";
import SidebarOption from "./SidebarOption";
import ConfirmModal from "./ConfirmModal";
import { UserContext } from "../context/userContext";

const Sidebar = () => {
  const [alertModal, setAlertModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { userId } = useContext(UserContext);

  const fetchUserProfile = async () => {
    try {
      const url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
      const res = await axios.get(url, {
        headers: {
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": userId,
        },
      });

      if (res.status === 200) {
        setUserData(res.data.users[0]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      fetchUserProfile();
    }
  }, []);

  const handleLogout = () => {
    try {
      setLogoutLoading(true);
      localStorage.removeItem("userData");
      toast.success("Logout successful", { duration: 1000 });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLogoutLoading(false);
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
            {userData?.name}
          </p>
          <p
            className="font-medium"
            style={{ color: "rgba(113, 142, 191, 1)" }}
          >
            {userData?.email}
          </p>
        </div>

        <LuLogOut
          onClick={() => setAlertModal(true)}
          color="rgba(113, 142, 191, 1)"
          className="text-lg cursor-pointer"
        />
      </div>
      {alertModal && (
        <ConfirmModal
          toggleModal={() => setAlertModal(false)}
          actionLoading={logoutLoading}
          action="logout"
          actionHandler={handleLogout}
        />
      )}
    </div>
  );
};

export default Sidebar;
