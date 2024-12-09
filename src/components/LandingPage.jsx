import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const LandingPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  const handleNicknameChange = (event) => {
    const value = event.target.value.toLowerCase(); 
    setNickname(value);
  };

  const handleCodeChange = (index, value) => {
    if (value.match(/^\d?$/)) {
      const updatedCode = [...code];
      updatedCode[index] = value;
      setCode(updatedCode);

      if (value !== "" && index < code.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const isFormValid = nickname !== "" && code.every((digit) => digit !== "");

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

      <Box sx={{ marginBottom: "2rem", width: "100%", textAlign: "center" }}>
        <TextField
          placeholder="Enter your nickname"
          variant="outlined"
          value={nickname}
          onChange={handleNicknameChange}
          inputProps={{
            style: { color: "#fff", textTransform: "lowercase" },
          }}
          sx={{
            fieldset: { borderColor: "#ff7f50" },
            "&:hover fieldset": { borderColor: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        {code.map((digit, index) => (
          <Box
            key={index}
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid #ff7f50",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 5px",
              backgroundColor: "#1a202c",
            }}
          >
            <TextField
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                },
              }}
              ref={(el) => (inputRefs.current[index] = el)} 
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{
          marginBottom: "1rem",
          backgroundColor: "#ff7f50",
          color: "#fff",
          "&:hover": { backgroundColor: "#e76642" },
          "&.Mui-disabled": {
            backgroundColor: "#ff7f50",
            opacity: 0.5, // Dim appearance for disabled
          },
        }}
        disabled={!isFormValid} // Disable button if form is invalid
        onClick={() => navigate("/waiting")} // Navigate to /waiting on click
      >
        Join
      </Button>

      {/* Create Button */}
      <Button
        variant="outlined"
        sx={{
          borderColor: "#ff7f50",
          color: "#ff7f50",
          "&:hover": { borderColor: "#fff", color: "#fff" },
          "&.Mui-disabled": {
            borderColor: "#ff7f50",
            color: "#ff7f50",
            opacity: 0.5, // Dim appearance for disabled
          },
        }}
        disabled={!isFormValid} // Disable button if form is invalid
        onClick={() => navigate("/create")}
      >
        Create
      </Button>
    </Box>
  );
};

export default LandingPage;
