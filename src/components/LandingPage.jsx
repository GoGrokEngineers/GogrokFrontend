// src/components/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#1a202c", 
        color: "#fff",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "2rem" }}>
        Go<span style={{ color: "#ff7f50" }}>Grok</span>
      </Typography>

      {/* Join Section */}
      <Box sx={{ marginBottom: "2rem" }}>
        <TextField
          placeholder="Enter Code"
          variant="outlined"
          sx={{
            input: { color: "#fff" },
            fieldset: { borderColor: "#ff7f50" },
            "&:hover fieldset": { borderColor: "#fff" },
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: "1rem",
            backgroundColor: "#ff7f50",
            "&:hover": { backgroundColor: "#e76642" },
          }}
        >
          Join
        </Button>
      </Box>

      {/* Create Section */}
      <Button
        variant="outlined"
        sx={{
          borderColor: "#ff7f50",
          color: "#ff7f50",
          "&:hover": { borderColor: "#fff", color: "#fff" },
        }}
        onClick={() => navigate("/create")}
      >
        Create
      </Button>
    </Box>
  );
};

export default LandingPage;
