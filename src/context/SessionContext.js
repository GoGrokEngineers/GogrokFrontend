import React, { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [duration, setDuration] = useState(1);
  const [members, setMembers] = useState("1");
  const [role, setRole] = useState("joiner");
  return (
    <SessionContext.Provider
      value={{
        duration,
        setDuration,
        members,
        setMembers,
        role,
        setRole,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

