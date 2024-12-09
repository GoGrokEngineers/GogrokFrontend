import React from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; 
import SendIcon from "@mui/icons-material/Send"; 

const CodingPlatform = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#1a202c",
        color: "#fff",
        padding: "1rem",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          borderBottom: "1px solid #3a3f47",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#ff7f50" }}
        >
          Go<span style={{ color: "#fff" }}>Grok</span>
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#3a3f47",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          <AccessTimeIcon sx={{ marginRight: "0.5rem", color: "#ff7f50" }} />
          22 : 14 : 14 : 11 {/* Timer */}
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              marginRight: "1rem",
              backgroundColor: "#3a3f47",
              "&:hover": { backgroundColor: "#4e535b" },
            }}
            startIcon={<PlayArrowIcon />}
          >
            Run
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff7f50",
              "&:hover": { backgroundColor: "#e76642" },
            }}
            startIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "3fr 1fr",
          gap: "1rem",
          height: "100%",
          padding: "1rem 0",
        }}
      >
        {/* Code Editor */}
        <Box
          sx={{
            gridColumn: "1 / span 1",
            gridRow: "1 / span 2",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#2d333b",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="subtitle1" sx={{ color: "#fff" }}>
              Code
            </Typography>
            <Select
              defaultValue="Python"
              sx={{
                color: "#fff",
                backgroundColor: "#3a3f47",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover": {
                  backgroundColor: "#4e535b",
                },
              }}
            >
              <MenuItem sx={{color: "#333"}} value="Python">Python</MenuItem>
              <MenuItem sx={{color: "#333"}}  value="JavaScript">JavaScript</MenuItem>
              <MenuItem sx={{color: "#333"}}  value="Java">Java</MenuItem>
              <MenuItem sx={{color: "#333"}}  value="C++">C++</MenuItem>
            </Select>
          </Box>
          <TextField
            multiline
            rows={20}
            placeholder="Write your code here..."
            variant="outlined"
            sx={{
              width: "100%",
              height: "100%",
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "#1a202c",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #3a3f47",
              },
            }}
          />
        </Box>

        {/* Description */}
        <Box
          sx={{
            gridColumn: "2 / span 1",
            gridRow: "1 / span 1",
            backgroundColor: "#2d333b",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
            Description
          </Typography>
          <Box
            sx={{
              height: "100%",
              overflowY: "auto",
              color: "#ccc",
            }}
          >
            <Typography>
              Write the problem description here. This section is scrollable to
              handle long content.
            </Typography>
          </Box>
        </Box>

        {/* Testcase */}
        <Box
          sx={{
            gridColumn: "2 / span 1",
            gridRow: "2 / span 1",
            backgroundColor: "#2d333b",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
            Testcase
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Write your testcase here..."
            variant="outlined"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "#1a202c",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #3a3f47",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CodingPlatform;
