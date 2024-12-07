import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionCode, setSessionCode] = useState("123456"); // Default code
  const [maxMembers, setMaxMembers] = useState(10); // Default max members

  return (
    <SessionContext.Provider value={{ sessionCode, setSessionCode, maxMembers, setMaxMembers }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
