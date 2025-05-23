import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { Person, ContentCopy } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GetData } from "../localstorage/savedata";
import { toast } from "react-toastify";

const WaitingRoom = () => {
  const [membersJoined, setMembersJoined] = useState(0);
  const maxMembers = GetData("data").capacity;
  const uid = GetData("data").uid;
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [username, setUsername] = useState("");
  const [countdown, setCountdown] = useState(5);
const [hasStarted, setHasStarted] = useState(false);

  // Reusable toast function
  const showToast = (type, msg) =>
    toast[type](msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

  // const handleStart = () => {
  //   if (!username) {
  //     showToast("warning", "Please fill the username");
  //     return;
  //   }
  //   if (!isReady) {
  //     setIsReady(true);
  //     setMembersJoined((prev) => prev + 1);
  //   }
  // };
const handleStart = () => {
  if (!username) {
    showToast("warning", "Please fill the username");
    return;
  }

  // First click on Start
  if (!hasStarted) {
    setHasStarted(true);
    setIsReady(true);
    setMembersJoined((prev) => prev + 1);
    showToast("success", "You are ready");
    return;
  }

  // Toggle Ready/Unready after Start
  setIsReady((prevReady) => {
    if (prevReady) {
      setMembersJoined((prev) => Math.max(prev - 1, 0));
      showToast("info", "You are unready");
    } else {
      if (membersJoined < maxMembers) {
        setMembersJoined((prev) => prev + 1);
        showToast("success", "You are ready");
      } else {
        showToast("warning", "Room is full");
        return prevReady;
      }
    }
    return !prevReady;
  });
};


  const isFull = membersJoined === maxMembers;

  useEffect(() => {
    if (membersJoined === maxMembers) {
      showToast("success", "All members are ready!");
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            navigate("/competition");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [membersJoined]);

  const handleCopy = () => {
    navigator.clipboard.writeText(uid.toString());
    showToast("success", "Copied to clipboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          bgcolor: "#161E31",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mt: 4 }}>
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  fontWeight: "bold",
                  fontSize: "2.7rem",
                  color: "white",
                }}
              >
                Go<span style={{ color: "#F8B179" }}>Grok</span>
              </Typography>
            </motion.div>

            {/* Main Card */}
            <Box
              sx={{
                bgcolor: "#424669",
                borderRadius: 6,
                p: 4,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* User Count */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 3,
                  mt: "2rem",
                }}
              >
                <Person sx={{ color: "#F8B179", fontSize: "4.5rem" }} />
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "3rem" }}
                >
                  {membersJoined} / {maxMembers}
                </Typography>
              </Box>

              {/* Enhanced Progress Bar with Label */}
              <Box sx={{ width: "100%", mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  {/* <Typography sx={{ color: "white", fontWeight: "bold" }}>
                    Readiness Progress
                  </Typography> */}
                  <Typography sx={{ color: "#F8B179", fontWeight: "bold" }}>
                    {Math.floor((membersJoined / maxMembers) * 100)}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={(membersJoined / maxMembers) * 100}
                  sx={{
                    height: 12,
                    borderRadius: 5,
                    backgroundColor: "#2D3250",
                    boxShadow: "0 0 5px rgba(255, 255, 255, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 5,
                      backgroundImage:
                        "linear-gradient(90deg, #F8B179, #ffcc80)",
                      transition: "width 0.5s ease-in-out",
                      boxShadow: isFull
                        ? "0 0 20px rgba(248, 177, 121, 0.9), 0 0 30px rgba(255, 204, 128, 0.8)"
                        : "0 0 10px rgba(248, 177, 121, 0.8)",
                      animation: isFull
                        ? "pulse 1.5s infinite ease-in-out"
                        : "none",
                    },
                  }}
                />
              </Box>

              {/* Joined Users */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                {[...Array(membersJoined)].map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      bgcolor: "#2D3250",
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      boxShadow: "0 0 10px rgba(248, 177, 121, 0.5)",
                    }}
                  >
                    Player {idx + 1}
                  </Box>
                ))}
              </Box>

              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  mb: 4,
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                Waiting
                <span className="dot-flashing" />
              </Typography>

              {/* Code Box */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  mb: "24px",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    display: "flex",
                    gap: "8px",
                    backgroundColor: "#2D3250",
                    padding: "1.5rem 3.5rem",
                    borderRadius: "10px",
                  }}
                >
                  {uid
                    .toString()
                    .split("")
                    .map((num, i) => (
                      <motion.div
                        key={i}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#fff",
                          borderRadius: 5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#161E31",
                          boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                        }}
                      >
                        {num}
                      </motion.div>
                    ))}
                </motion.div>
                <ContentCopy
                  onClick={handleCopy}
                  sx={{ cursor: "pointer", color: "#F8B179", fontSize: "2rem" }}
                />
              </Box>

              {/* Username Field */}
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  mb: "24px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E4A66B",
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#E4A66B" },
                }}
                label="Username"
                variant="outlined"
              />

              {/* Start Button */}
              <Tooltip
                title={!username ? "Please fill the username" : ""}
                arrow
              >
                <Button
                  variant="contained"
                  onClick={handleStart}
                  sx={{
                    bgcolor: "#F8B179",
                    color: "white",
                    px: 6.5,
                    py: 0.5,
                    borderRadius: 2,
                    mb: 5,
                    textTransform: "none",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#F8B179" },
                  }}
                >
                 {!hasStarted ? "Start" : isReady ? "Unready" : "Ready"}

                </Button>
              </Tooltip>

              {/* Countdown Message */}
              {membersJoined === maxMembers && (
                <Typography
                  variant="h5"
                  sx={{ color: "#F8B179", fontWeight: "bold", mt: 2 }}
                >
                  Starting in {countdown}...
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CSS for dot animation */}
      <style>{`
        .dot-flashing {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-left: 5px;
          background-color: #f8b179;
          border-radius: 50%;
          animation: dotFlashing 1s infinite linear alternate;
        }
        @keyframes dotFlashing {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }

        @keyframes pulse {
  0% {
    box-shadow: 0 0 10px rgba(248, 177, 121, 0.8);
  }
  50% {
    box-shadow: 0 0 20px rgba(248, 177, 121, 1);
  }
  100% {
    box-shadow: 0 0 10px rgba(248, 177, 121, 0.8);
  }
}

      `}</style>
    </motion.div>
  );
};

export default WaitingRoom;
