import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUserId(userData?.userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
