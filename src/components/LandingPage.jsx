import { Box, Button, Card, Typography } from "@mui/material";
import OTPInput from "./ui/opt-input";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";
import WebsocketServices from "../services/web-socket";

const MatchingRoom = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.length !== 6 || inputValue.length === "") {
      toast.warn("Must be 6 character", {
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
    try {
      const response = await WebsocketServices.Handshake(inputValue);
      if (response.success === true) {
        toast.success("successfully joined", {
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
      }
    } catch (error) {
      toast.warn(error.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleCreate = () => {
    navigate("/create");
  };
  return (
    <div>
      <Box
        bgcolor={"#1a202c"}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        height={"100vh"}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontSize: "80px",
              fontWeight: "800",
              color: "#ffff",
              "& span": {
                color: "#F8B179",
              },
            }}
          >
            Go
            <span>Grok</span>
          </Typography>
        </Box>
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
            onSubmit={onSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            component="form"
          >
            {/* to enter numbers */}
            <OTPInput
              value={inputValue}
              onChange={setInputValue}
              separator={<span>-</span>}
              length={6}
            />
            {/* Join button */}
            <Button
              type="submit"
              sx={{
                width: "100px",
                marginTop: "35px",
                backgroundColor: "#F8B179",
                color: "#2D3250",
                fontWeight: 700,
                fontSize: "20px",
              }}
              variant="contained"
            >
              Join
            </Button>
          </Box>
        </Card>

        {/* Create button */}
        <Button
          onClick={handleCreate}
          sx={{
            width: "140px",
            marginTop: "35px",
            backgroundColor: "#ffff",
            fontSize: "20px",
            fontWeight: 600,
            paddingX: "50px",
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
