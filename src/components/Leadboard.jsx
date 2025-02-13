import React, { useState } from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const Leaderboard = () => {
  const [filter, setFilter] = useState("solved");
  const data = {
    solved: [
      { rank: 1, name: "User1", avatar: "avatar1.png", points: 1200 },
      { rank: 2, name: "User2", avatar: "avatar2.png", points: 1100 },
      { rank: 3, name: "User3", avatar: "avatar3.png", points: 1050 },
      { rank: 4, name: "User4", avatar: "avatar4.png", points: 1000 },
      { rank: 5, name: "User5", avatar: "avatar5.png", points: 950 },
      { rank: 6, name: "User6", avatar: "avatar6.png", points: 900 },
      { rank: 7, name: "User7", avatar: "avatar7.png", points: 850 },
    ],
    unsolved: [
      { name: "User8", avatar: "avatar8.png" },
      { name: "User9", avatar: "avatar9.png" },
      { name: "User10", avatar: "avatar10.png" },
      { name: "User11", avatar: "avatar11.png" },
      { name: "User12", avatar: "avatar12.png" },
      { name: "User13", avatar: "avatar13.png" },
    ],
  };

  const getUserIcon = (rank) => {
    switch (rank) {
      case 1:
        return <EmojiEventsIcon sx={{ color: "#FFD700" }} />;
      case 2:
        return <MilitaryTechIcon sx={{ color: "#C0C0C0" }} />;
      case 3:
        return <WorkspacePremiumIcon sx={{ color: "#CD7F32" }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #161E31, #1F2A47)",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, color: "#f8b179", alignSelf: "start" }}
      >
        Go<span style={{ color: "#fff" }}>Grok</span>
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#f8b179",
          alignSelf: "center",
        }}
      >
        Leaderboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {Object.keys(data).map((type) => (
          <Paper
            key={type}
            sx={{
              width: "350px",
              bgcolor: "#2D3250",
              borderRadius: "15px",
              padding: "1rem",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.2rem",
                color: filter === type ? "#FFD700" : "#fff",
                cursor: "pointer",
              }}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>
            <Box
              sx={{
                maxHeight: "300px",
                overflowY: "auto",
                mt: 2,
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "linear-gradient(180deg, #f8b179, #ff8e53)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "linear-gradient(180deg, #ff8e53, #f8b179)",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                },
              }}
            >
              {data[type].map((user) => (
                <Box
                  key={user.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    borderBottom: "1px solid #40495C",
                    borderRadius: "10px",
                    marginY: "5px",
                    bgcolor:
                      user.rank && user.rank <= 3 ? "#222A40" : "inherit",
                  }}
                >
                  {user.rank && getUserIcon(user.rank)}
                  <Avatar
                    src={user.avatar || "https://via.placeholder.com/40"}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography sx={{ flex: 1, fontSize: "1rem" }}>
                    {user.name}
                  </Typography>
                  {user.points && (
                    <Typography sx={{ fontWeight: "bold", color: "#FFD700" }}>
                      {user.points} pts
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Leaderboard;
