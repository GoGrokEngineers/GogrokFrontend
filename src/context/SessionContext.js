import React, { createContext, useState } from "react";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [duration, setDuration] = useState(1);
  return (
    <SessionContext.Provider value={{ duration, setDuration }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
