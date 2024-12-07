import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Slider, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const CreateSession = () => {
  const navigate = useNavigate();
  const [members, setMembers] = React.useState(1);
  const [duration, setDuration] = React.useState(15); // Default duration
  const [difficulty, setDifficulty] = React.useState("easy");

  // Define ranges for each difficulty level
  const difficultyRanges = {
    easy: { min: 0, max: 30 },
    medium: { min: 30, max: 60 },
    hard: { min: 60, max: 90 },
  };

  // Get the current range based on difficulty
  const { min, max } = difficultyRanges[difficulty];

  // Ensure the duration stays within the selected range
  React.useEffect(() => {
    if (duration < min) setDuration(min);
    if (duration > max) setDuration(max);
  }, [difficulty, min, max]);

  const handleCreate = () => {
    // Logic for creating the session goes here (API call, etc.)
    navigate("/waiting");
  };

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
        Create Session
      </Typography>

      {/* Member Count */}
      <TextField
        type="number"
        label="Members"
        value={members}
        onChange={(e) => setMembers(Number(e.target.value))}
        sx={{
          input: { color: "#fff" },
          fieldset: { borderColor: "#ff7f50" },
          "&:hover fieldset": { borderColor: "#fff" },
        }}
      />

      {/* Duration */}
      <Typography sx={{ marginTop: "1rem" }}>Duration (mins)</Typography>
      <Slider
        value={duration}
        min={min}
        max={max}
        step={5}
        onChange={(e, value) => setDuration(value)}
        sx={{ color: "#ff7f50", width: "60%" }}
      />
      <Typography>{`Selected Duration: ${duration} mins`}</Typography>

      {/* Difficulty */}
      <Typography sx={{ marginTop: "1rem" }}>Difficulty</Typography>
      <RadioGroup
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        row
        sx={{ color: "#fff" }}
      >
        <FormControlLabel value="easy" control={<Radio />} label="Easy" />
        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="hard" control={<Radio />} label="Hard" />
      </RadioGroup>

      {/* Create Button */}
      <Button
        variant="contained"
        sx={{
          marginTop: "2rem",
          backgroundColor: "#ff7f50",
          "&:hover": { backgroundColor: "#e76642" },
        }}
        onClick={handleCreate}
      >
        Create
      </Button>
    </Box>
  );
};

export default CreateSession;
