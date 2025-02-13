// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import SessionProvider from "./context/SessionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <App />
      </SessionProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
