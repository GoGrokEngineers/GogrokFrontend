import { useEffect, useState } from "react";
import { Box, Typography, Button, Container, TextField, Tooltip } from "@mui/material";
import { Person, ContentCopy } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GetData } from "../localstorage/savedata";
import { toast } from "react-toastify";

const WaitingRoom = () => {
  // Initially, no members have joined
  const [membersJoined, setMembersJoined] = useState(0);
  // maxMembers is taken from the create page
  const maxMembers = GetData("data").capacity;
  const uid = GetData("data").uid;
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  // State for username input
  const [username, setUsername] = useState("");

  const handleStart = async () => {
    // If username is empty, show a toast message and do nothing
    if (!username) {
      toast.warning("please fill the username", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    // If not already ready, set ready and update members count
    if (!isReady) {
      setIsReady(true);
      setMembersJoined((prev) => prev + 1);
      if (membersJoined + 1 === maxMembers) {
        toast.success("All members are ready!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        navigate("/competition");
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uid.toString());
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
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
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 4,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  fontWeight: "bold",
                  fontSize: "2.7rem",
                  alignSelf: "start",
                  color: "white",
                  "& span": {
                    color: "#F8B179",
                  },
                }}
              >
                Go<span>Grok</span>
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
                  fontWeight: "bold",
                  fontSize: "4rem",
                }}
              >
                <Person
                  sx={{
                    color: "#F8B179",
                    fontWeight: "bold",
                    fontSize: "4.5rem",
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "3rem",
                      alignSelf: "self-end",
                    }}
                  >
                    {membersJoined} / {maxMembers}
                  </Typography>
                </motion.div>
              </Box>

              {/* Waiting Text */}
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  mb: 4,
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                Waiting...
              </Typography>

              {/* Generated Code with Copy Icon */}
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
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "3.5rem",
                    paddingRight: "3.5rem",
                    borderRadius: "10px",
                  }}
                >
                  {uid
                    .toString()
                    .split("")
                    .map((num, i) => (
                      <motion.div
                        key={i}
                        initial="initial"
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
                        }}
                      >
                        {num}
                      </motion.div>
                    ))}
                </motion.div>
                <ContentCopy
                  onClick={handleCopy}
                  sx={{
                    cursor: "pointer",
                    color: "#F8B179",
                    fontSize: "2rem",
                  }}
                />
              </Box>

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
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
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#E4A66B",
                    },
                  }}
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                />
              </motion.div>
              {/* Start/Ready Button with Tooltip */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Tooltip
                  title={!username ? "please fill the username" : ""}
                  arrow
                  disableFocusListener={false}
                  disableHoverListener={false}
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
                      "&:hover": {
                        bgcolor: "#F8B179",
                      },
                    }}
                  >
                    {isReady ? "Ready" : "Start"}
                  </Button>
                </Tooltip>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default WaitingRoom;
