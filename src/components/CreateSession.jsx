import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  styled,
  Modal,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Custom styled components
const Container = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  backgroundColor: "#161E31",
});

const Logo = styled(Typography)({
  fontSize: "7rem",
  fontWeight: "bold",
  color: "#fff",
  textAlign: "center",
  lineHeight: 1,
  "& span": {
    color: "#F8B179",
    display: "block",
    marginLeft: "2rem",
  },
});

const Card = styled(Box)({
  backgroundColor: "#424669",
  borderRadius: "16px",
  padding: "25px",
  width: "350px",
  height: "450px",
});

const FormLabel = styled(Typography)({
  color: "#f8b179",
  marginBottom: "8px",
  fontSize: "1.3rem",
  fontWeight: "inherit",
});

const FormLabelBold = styled(Typography)({
  color: "#f8b179",
  fontSize: "2rem",
  textAlign: "center",
  fontWeight: "bold",
  marginTop: "30px",
});

const StyledSelect = styled(Select)({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "#000",
  background: "#fff",
  padding: "8px",
  width: "125px",
  height: "40px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f8b179",
  },
});

const DifficultyContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "35px",
  marginTop: "40px",
});

const DifficultyOption1 = styled(Box)(({ selected }) => ({
  position: "relative",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "#2D3250",
  cursor: "pointer",
  transition: "all 0.2s ease",
}));

const DifficultyOption2 = styled(Box)(({ selected }) => ({
  position: "absolute",
  top: "24%",
  left: "25%",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  backgroundColor: selected ? "#f8b179" : "",
  cursor: "pointer",
  transition: "all 0.2s ease",
}));

const CreateButton = styled(Button)({
  display: "flex",
  justifySelf: "center",
  backgroundColor: "#f8b179",
  color: "#fff",
  width: "50%",
  padding: "1px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginTop: "30px",
  "&:hover": {
    backgroundColor: "#d89d7f",
  },
});

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#161E31",
  color: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateSession() {
  const [members, setMembers] = useState("1");
  const [duration, setDuration] = useState("45:00");
  const [customDuration, setCustomDuration] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    if (members === "1") {
      handleOpen();
    } else {
      navigate("/waiting");
    }
  };
  const handleDurationInput = (e) => {
    const value = e.target.value;
    setDuration(value);
  };

  return (
    <Container>
      <Logo variant="h1">
        Go
        <span>Grok</span>
      </Logo>

      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifySelf: "center",
            gap: 3,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <FormLabel>Members</FormLabel>
            <StyledSelect
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              size="medium"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem
                  key={num}
                  value={num}
                  style={{ background: "#F8B179" }}
                >
                  {num}
                </MenuItem>
              ))}
            </StyledSelect>
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormLabel>Duration</FormLabel>
            <StyledSelect
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              size="medium"
              renderValue={(value) => value}
			  MenuProps={{
				MenuListProps: {
					onMouseDown: (e) => e.stopPropagation(), 
				},
			}}
            >
              {["15:00", "30:00", "45:00", "60:00"].map((time) => (
                <MenuItem
                  key={time}
                  value={time}
                  style={{ background: "#F8B179" }}
                >
                  {time}
                </MenuItem>
              ))}
              <MenuItem value={duration} style={{ background: "#F8B179" }}>
                <TextField
                  value={duration}
				  onClick={(e) => e.stopPropagation()}
                  onChange={handleDurationInput}
                  variant="standard"
                  placeholder="Enter custom time"
                  sx={{
                    background: "#fff",
                    borderRadius: "4px",
                    width: "100%",
					color: "#000",
                  }}
                  inputProps={{
                    style: { padding: "5px", fontSize: "1rem" },
                  }}
                />
              </MenuItem>
            </StyledSelect>
          </Box>
        </Box>

        <Box>
          <FormLabelBold>Difficulty</FormLabelBold>
          <DifficultyContainer>
            {["easy", "medium", "hard"].map((level) => (
              <Box key={level} sx={{ textAlign: "center" }}>
                <DifficultyOption1
                  selected={difficulty === level}
                  onClick={() => setDifficulty(level)}
                >
                  <DifficultyOption2
                    selected={difficulty === level}
                    onClick={() => setDifficulty(level)}
                  />
                </DifficultyOption1>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    mt: 0.5,
                    textTransform: "capitalize",
                  }}
                >
                  {level}
                </Typography>
              </Box>
            ))}
          </DifficultyContainer>
        </Box>

        <CreateButton variant="contained" onClick={handleClick}>
          Create
        </CreateButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Warning
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You can't play alone! Please select more members.
            </Typography>
          </Box>
        </Modal>
      </Card>
    </Container>
  );
}
