import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import OTPInput from "./ui/opt-input";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const MatchingRoom = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleJoin = () => {
    if (value.length !== 6) {
      return toast.warn("Does not have enough characters!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else if (value !== "123456") {
      return toast.warn("numbers do not match!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      return navigate("/waiting");
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
              fontWeight: 900,
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OTPInput
            separator={<span>-</span>}
            value={value}
            onChange={setValue}
            length={6}
          />
          <Button
            onClick={handleJoin}
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
        </Card>
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
