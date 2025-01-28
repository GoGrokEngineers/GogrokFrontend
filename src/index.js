// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import SessionProvider from "./context/SessionContext";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SessionProvider>
      <App />
    </SessionProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
