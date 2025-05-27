// create session page
import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  styled,
  TextField,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { SaveData } from "../localstorage/savedata";
import { useCreateCompetition } from "../hooks/useCreateCompetition";
import { WsConnection } from "../services/web-socket";
import { motion } from "framer-motion";

const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  backgroundColor: "#161E31",
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    gap: theme.spacing(4),
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
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
  [theme.breakpoints.down("md")]: {
    fontSize: "4rem",
    "& span": {
      marginLeft: "1rem",
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3rem",
  },
}));

const Card = styled(motion(Box))(({ theme }) => ({
  backgroundColor: "#424669",
  borderRadius: "16px",
  padding: "25px",
  width: "350px",
  height: "auto",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "20px",
  },
}));

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

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "black",
    backgroundColor: "white",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "lightgray",
    },
    "&:hover fieldset": {
      borderColor: "#F8B179",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F8B179",
      boxShadow: "0 0 8px rgba(248, 177, 121, 0.5)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#F8B179",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#F8B179",
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px",
  },
});

const StyledSelect = styled(Select)({
  backgroundColor: "white",
  color: "black",
  borderRadius: "8px",
  padding: "8px",
  transition: "all 0.3s ease",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "lightgray",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#F8B179",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#F8B179",
    boxShadow: "0 0 8px rgba(248, 177, 121, 0.5)",
  },
});

const DifficultyContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  marginTop: "40px",
  flexWrap: "wrap",
});

const DifficultyOption = styled(motion(Box))(({ selected }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: selected ? "#07BC0B" : "#2D3250",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: selected ? "#07BC0B" : "#3a4060",
  },
}));

const CreateButton = styled(motion(Button))(({ theme }) => ({
  display: "flex",
  justifySelf: "center",
  backgroundColor: "#f8b179",
  color: "#fff",
  width: "50%",
  padding: "10px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1.8rem",
  fontWeight: "bold",
  margin: "30px auto",
  "&:hover": {
    backgroundColor: "#d89d7f",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    fontSize: "1.5rem",
  },
}));

export default function CreateSession() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      difficulty: "Easy",
      duration: 30,
      capacity: 2,
    },
  });

  const duration = watch("duration");
  const difficulty = watch("difficulty");
  const navigate = useNavigate();
  const { mutate, error, isLoading } = useCreateCompetition();

  const onSubmit = (e) => {
    mutate(e, {
      onSuccess: (response) => {
        toast.success(`${response.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
        SaveData({ ...e, uid: response.competition_uid });
        WsConnection(response.competition_uid)
          .then((res) => {
            if (res.isOpen) navigate("/waiting");
          })
          .catch((err) => console.log(err));
      },
      onError: (error) => {
        toast.warn(error.response?.data?.errors?.duration?.[0] || "Error creating session", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      },
    });
  };

  const onError = (errors) => {
    if (errors.capacity) {
      toast.warn(errors.capacity.message, {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const inputVariants = {
    initial: { scale: 1 },
    focused: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3, yoyo: Infinity } },
    tap: { scale: 0.95 },
  };

  return (
    <Container>
      <Logo variant="h1">
        Go
        <span>Grok</span>
      </Logo>

      <Card initial="hidden" animate="visible" variants={cardVariants}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <FormLabel>Members</FormLabel>
              <motion.div variants={inputVariants} initial="initial" whileFocus="focused">
                <StyledTextField
                  variant="outlined"
                  type="number"
                  placeholder="Enter members"
                  {...register("capacity", {
                    required: true,
                    min: { value: 2, message: "Must be at least 2" },
                  })}
                  InputLabelProps={{ shrink: false }}
                  sx={{ width: { xs: "100%", sm: "125px" }, height: "41px" }}
                />
              </motion.div>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormLabel>Duration</FormLabel>
              <motion.div variants={inputVariants} initial="initial" whileFocus="focused">
                <StyledSelect
                  size="medium"
                  {...register("duration", { required: true })}
                  value={duration}
                  sx={{ width: { xs: "100%", sm: "125px" }, height: "41px" }}
                >
                  {[30, 60, 90].map((time) => (
                    <MenuItem key={time} value={time} sx={{ color: "black" }}>
                      {time} min
                    </MenuItem>
                  ))}
                </StyledSelect>
              </motion.div>
            </Box>
          </Box>

          <Box>
            <FormLabelBold>Difficulty</FormLabelBold>
            <DifficultyContainer>
              {["Easy", "Medium", "Hard"].map((level) => (
                <FormControlLabel
                  key={level}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                  value={level}
                  control={
                    <Radio
                      {...register("difficulty", { required: true })}
                      sx={{ display: "none" }}
                      checked={difficulty === level}
                    />
                  }
                  label={
                    <Box sx={{ textAlign: "center" }}>
                      <DifficultyOption
                        selected={difficulty === level}
                        animate={{ scale: difficulty === level ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {difficulty === level && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            ✓
                          </motion.div>
                        )}
                      </DifficultyOption>
                      <Typography sx={{ mt: 1, color: "#fff" }}>{level}</Typography>
                    </Box>
                  }
                />
              ))}
            </DifficultyContainer>
          </Box>

          <CreateButton
            variant="contained"
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </CreateButton>
        </form>
      </Card>
    </Container>
  );
}
