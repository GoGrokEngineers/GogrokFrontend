import React, { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
