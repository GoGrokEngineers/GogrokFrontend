import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import OTPInput from "./ui/opt-input";

const MatchingRoom = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Box
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
              fontFamily: "Signika Negative, serif",
              fontWeight: 600,
              color: "#ffff",
            }}
          >
            Go
          </Typography>
          <Typography
            sx={{
              fontSize: "80px",
              fontFamily: "Signika Negative, serif",
              fontWeight: 600,
              color: "#F8B179",
            }}
          >
            Grok
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
            sx={{
              width: "100px",
              marginTop: "35px",
              BackgroundColor: "#F8B179",
              color: "#2D3250",
              fontSize: "20px",
            }}
            variant="contained"
          >
            Join
          </Button>
          {/* <span>Entered value: {value}</span> */}
        </Card>
        <Button
          sx={{
            width: "100px",
            marginTop: "35px",
            // BackgroundColor: "#ffff",
            // color: "#2D3250",
            fontSize: "20px",
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
