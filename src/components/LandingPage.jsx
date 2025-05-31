// MatchingRoom.jsx
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import OTPInput from "./ui/opt-input";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { motion } from "framer-motion";
import { WsConnection, SendData } from "../services/web-socket";

const MatchingRoom = () => {
  const [inputValue, setInputValue] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const wsRef = useRef(null);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // 1) Validates the cdoe
    if (inputValue.length !== 6) {
      toast.warn("Room code must be exactly 6 characters", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setIsConnecting(true);

    try {
      // 2) Open (or reuse) the WebSocket for this room
      const { isOpen, socket } = await WsConnection(inputValue);
      if (!isOpen) {
        throw new Error("Failed to open WebSocket connection");
      }
      wsRef.current = socket;

      // 3) Create a Promise that resolves when the server tells us our user has joined.
     
      const nickname = "Visitor"; 
      const joinPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Join request timed out (no response from server)"));
        }, 5000);

        const handleMessage = (event) => {
          let msg;
          try {
            msg = JSON.parse(event.data);
          } catch {
            return; // ignore non-JSON
          }

          if (msg.type === "user_joined" && msg.nickname === nickname) {
            clearTimeout(timeout);
            socket.removeEventListener("message", handleMessage);
            resolve();
          }
        };

        socket.addEventListener("message", handleMessage);
      });

      // 4) Sends the “join” action 
      await SendData({
        action: "join",
        nickname: nickname,
      });

      await joinPromise;

      toast.success("Successfully joined room!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/waiting");
    } catch (err) {
      console.error("Join flow error:", err);
      toast.error(err.message || "Failed to join room", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <div>
      <Box
        bgcolor="#1a202c"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
        position="relative"
      >
        <Typography
          sx={{
            fontSize: "80px",
            fontWeight: "800",
            color: "#ffffff",
            userSelect: "none",
            "& span": { color: "#F8B179" },
          }}
        >
          Go<span>Grok</span>
        </Typography>

        <Card
          sx={{
            marginY: "20px",
            background: "#424669",
            borderRadius: "20px",
            paddingX: "40px",
            paddingY: "40px",
          }}
        >
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Animated arrow prompting the user to enter a code */}
            {/* {inputValue.length < 6 && (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                style={{
                  color: "#F8B179",
                  marginTop: "10px",
                  fontSize: "1rem",
                }}
              >
                ↓ Enter code to join
              </motion.div>
            )} */}

            <OTPInput
              value={inputValue}
              onChange={setInputValue}
              separator={<span>-</span>}
              length={6}
            />

            <Button
              type="submit"
              disabled={isConnecting}
              sx={{
                width: "100px",
                marginTop: "35px",
                backgroundColor: "#F8B179",
                color: "#2D3250",
                fontWeight: 700,
                fontSize: "20px",
                opacity: isConnecting ? 0.6 : 1,
                cursor: isConnecting ? "not-allowed" : "pointer",
              }}
              variant="contained"
            >
              {isConnecting ? "Joining…" : "Join"}
            </Button>
          </Box>
        </Card>

        {/* Animated arrow prompting “or create” when input is empty */}
        {/* {inputValue.length === 0 && (
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            style={{
              color: "#F8B179",
              fontSize: "1rem",
              marginBottom: "5px",
            }}
          >
            ↓ Or create your own room
          </motion.div>
        )} */}

        <Button
          onClick={handleCreate}
          disabled={inputValue.length > 0}
          sx={{
            width: "140px",
            backgroundColor: "#ffffff",
            fontSize: "20px",
            fontWeight: 600,
            paddingX: "50px",
            marginTop: "10px",
            opacity: inputValue.length > 0 ? 0.5 : 1,
            cursor: inputValue.length > 0 ? "not-allowed" : "pointer",
          }}
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

export default MatchingRoom;
