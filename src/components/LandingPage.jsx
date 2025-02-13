import { Box, Button, Card, Typography } from "@mui/material";

import OTPInput from "./ui/opt-input";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'

const MatchingRoom = () => {
  const navigate = useNavigate();
  const { value, setValue } = useContext(SessionContext);

  const handleJoin = (e) => {
    e.preventDefault();
    // numbers checking full(6) or not
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
      // check matching
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
              fontWeight:'800',
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
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            component="form"
            onSubmit={handleJoin}
          >
            {/* to enter numbers */}
            <OTPInput
              separator={<span>-</span>}
              value={value}
              onChange={setValue}
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
