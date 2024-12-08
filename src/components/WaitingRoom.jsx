import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const WaitingRoom = () => {
  const [membersJoined, setMembersJoined] = useState(6);
  const [maxMembers, setMaxMembers] = useState(10);
  const [sessionCode, setSessionCode] = useState("123456");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const interval = setInterval(() => {
      if (membersJoined < maxMembers) {
        setMembersJoined((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [membersJoined, maxMembers]);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate to /solving when the session starts
      navigate("/solving");
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
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
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Go<span style={{ color: "#ff7f50" }}>Grok</span>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
            {membersJoined} / {maxMembers} Members Joined
          </Typography>
          <CircularProgress
            variant="determinate"
            value={(membersJoined / maxMembers) * 100}
            sx={{ color: "#ff7f50", marginBottom: "2rem" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Typography sx={{ marginBottom: "2rem" }}>
            Session Code:{" "}
            <span
              style={{
                fontWeight: "bold",
                padding: "0.5rem 1rem",
                backgroundColor: "#2d3748",
                borderRadius: "5px",
                color: "#ff7f50",
              }}
            >
              {sessionCode}
            </span>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: membersJoined === maxMembers ? "#ff7f50" : "#666",
              "&:hover": {
                backgroundColor:
                  membersJoined === maxMembers ? "#e76642" : "#666",
              },
              pointerEvents: membersJoined === maxMembers ? "auto" : "none",
            }}
            onClick={handleStart}
            disabled={membersJoined < maxMembers}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Start"}
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default WaitingRoom;
