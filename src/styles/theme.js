// src/styles/theme.js
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff7f50",
    },
    secondary: {
      main: "#1a202c",
    },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    fontFamily: "'Hepta Slab', sans-serif",
  },
});

export default theme;
