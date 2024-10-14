import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  //Why empty string here
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  //This will lead an UI glitch
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/login", { replace: true });
    }
  }, []);

  //Initially two useEffects will be triggered
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUserId(userData?.userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
