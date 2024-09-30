import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);
  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        userToken,
        setUserToken,
        walletStatus,
        setWalletStatus,
      }}
    >
      {children}
    </Context.Provider>
  );
};
