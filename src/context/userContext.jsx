import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOCALSTORAGE_KEY } from "../contants";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
      navigate("/login", { replace: true });
    } else {
      const userData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
      const { userId } = userData;
      setUserId(userId);
    }
  }, [userId]);

  if (userId) {
    return (
      <UserContext.Provider value={{ userId, setUserId }}>
        {children}
      </UserContext.Provider>
    );
  } else {
    return <></>;
  }
};
