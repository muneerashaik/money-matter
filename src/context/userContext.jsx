import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOCALSTORAGE_KEY, LOGIN_ROUTE } from "../contants";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  const isAdmin = userData?.admin;

  useEffect(() => {
    if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
      navigate(LOGIN_ROUTE, { replace: true });
    } else {
      const { userId } = userData;
      setUserId(userId);
    }
  }, [userData.userId]);

  if (userId) {
    return (
      <UserContext.Provider value={{ userId, setUserId, isAdmin }}>
        {children}
      </UserContext.Provider>
    );
  } else {
    <></>;
  }
};
