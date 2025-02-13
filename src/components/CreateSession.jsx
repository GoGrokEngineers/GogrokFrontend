
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  styled,
  Modal,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import { Bounce, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { SaveData } from "../localstorage/savedata";
import ApiService from "../services/api-serives";
import { useCreateCompetition } from "../hooks/useCreateCompetition";

import { useContext, useState } from 'react'
import {
	Box,
	Typography,
	Select,
	MenuItem,
	Button,
	styled,
	TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../context/SessionContext'
import { Bounce, toast } from 'react-toastify'


// Custom styled components
const Container = styled(Box)({
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	backgroundColor: '#161E31',
})

const Logo = styled(Typography)({
	fontSize: '7rem',
	fontWeight: 'bold',
	color: '#fff',
	textAlign: 'center',
	lineHeight: 1,
	'& span': {
		color: '#F8B179',
		display: 'block',
		marginLeft: '2rem',
	},
})

const Card = styled(Box)({
	backgroundColor: '#424669',
	borderRadius: '16px',
	padding: '25px',
	width: '350px',
	height: '450px',
})

const FormLabel = styled(Typography)({
	color: '#f8b179',
	marginBottom: '8px',
	fontSize: '1.3rem',
	fontWeight: 'inherit',
})

const FormLabelBold = styled(Typography)({
	color: '#f8b179',
	fontSize: '2rem',
	textAlign: 'center',
	fontWeight: 'bold',
	marginTop: '30px',
})

const StyledSelect = styled(Select)({
	backgroundColor: 'rgba(255, 255, 255, 0.05)',
	color: '#000',
	background: '#fff',
	padding: '8px',
	width: '125px',
	height: '40px',
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: 'rgba(255, 255, 255, 0.2)',
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: '#f8b179',
	},
})

const DifficultyContainer = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '35px',
	marginTop: '40px',
})

const DifficultyOption1 = styled(Box)(({ selected }) => ({
	position: 'relative',
	width: '50px',
	height: '50px',
	borderRadius: '50%',
	backgroundColor: '#2D3250',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
}))

const DifficultyOption2 = styled(Box)(({ selected }) => ({
	position: 'absolute',
	top: '24%',
	left: '25%',
	width: '25px',
	height: '25px',
	borderRadius: '50%',
	backgroundColor: selected ? '#f8b179' : '',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
}))

const CreateButton = styled(Button)({
	display: 'flex',
	justifySelf: 'center',
	backgroundColor: '#f8b179',
	color: '#fff',
	width: '50%',
	padding: '1px',
	borderRadius: '8px',
	textTransform: 'none',
	fontSize: '1.8rem',
	fontWeight: 'bold',
	marginTop: '30px',
	'&:hover': {
		backgroundColor: '#d89d7f',
	},
})

export default function CreateSession() {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      difficulty: "Easy",
      duration: 15,
      capacity: 1,
    },
  });
  const duration = watch("duration");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate, error, isLoading, isSuccess, data } = useCreateCompetition();
  const onSubmit = (e) => {
    SaveData(e);
    mutate(e, {
      onSuccess: (response) => {
        toast.success(`${response.message} code:${response.competition_uid}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
        // navigate("/waiting");
        console.log(response);
      },
      onError: (error) => {
        toast.warn(error.response.data.errors.duration[0], {
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
    if (errors.members) {
      toast.warn(errors.members.message, {
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

	const { duration, setDuration, members, setMembers, setRole } =
		useContext(SessionContext)
	const [difficulty, setDifficulty] = useState('easy')
	const [hasWarned, setHasWarned] = useState(false)
	const navigate = useNavigate()

	const handleClick = () => {
		if (members <= 1) {
			// 1 yoki undan kam bo'lsa
			if (!toast.isActive('member-warning')) {
				toast.warn("You can't start with 1 or fewer members", {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
					transition: Bounce,
					toastId: 'member-warning',
				})
			}
		} else {
			setRole('creater')
			navigate('/waiting')
		}
	}

	const handleDurationInput = e => {
		const value = e.target.value

		if (value.length > 2) {
			if (!hasWarned) {
				toast.warn('You must enter up to 2 characters', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
					transition: Bounce,
				})

				setHasWarned(true)
				setTimeout(() => setHasWarned(false), 4000)
			}
			return
		}

		setDuration(value)
	}


	return (
		<Container>
			{/* Logo */}
			<Logo variant='h1'>
				Go
				<span>Grok</span>
			</Logo>


      <Card>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              <TextField
                variant="outlined"
                type="number"
                {...register("capacity", {
                  required: true,
                  min: { value: 1, message: "Must be greater than 0" },
                })}
                InputLabelProps={{ shrink: false }}
                sx={{
                  width: "125px",
                  height: "41px",
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                    backgroundColor: "white",
                    "& fieldset": {
                      borderColor: "lightgray",
                    },
                    "&:hover fieldset": {
                      borderColor: "gray",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F8B179",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#F8B179",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "8px",
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormLabel>Duration</FormLabel>
              <StyledSelect
                size="medium"
                {...register("duration", { required: true })}
                value={duration}
              >
                {[15, 30, 45, 60].map((time) => (
                  <MenuItem
                    key={time}
                    value={time}
                    style={{ background: "#F8B179" }}
                  >
                    {time} : min
                  </MenuItem>
                ))}
                <MenuItem style={{ background: "#F8B179" }}>
                  <TextField
                    {...register("duration", { required: true })}
                    type="number"
                    required
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                    onBlur={() => console.log("Blur event triggered")}
                    onChange={(e) => setValue("duration", e.target.value)}
                    variant="standard"
                    placeholder="Enter custom time"
                    sx={{
                      background: "#676f9d",
                      borderRadius: "4px",
                      width: "100%",
                      color: "#000",
                    }}
                    inputProps={{
                      min: "0",
                      style: { padding: "5px", fontSize: "1rem" },
                    }}
                  />
                </MenuItem>
              </StyledSelect>
            </Box>
          </Box>

          <Box>
            <FormLabelBold>Difficulty</FormLabelBold>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Easy"
                name="radio-buttons-group"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#2D3250",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "300px",
                }}
              >
                {["Easy", "Medium", "Hard"].map((level) => (
                  <FormControlLabel
                    {...register("difficulty", { required: true })}
                    key={level}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                      fontWeight: "bold",
                      "&.MuiFormControlLabel-root": {
                        margin: 0,
                      },
                    }}
                    value={level}
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#FFBF86",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 40,
                          },
                        }}
                      />
                    }
                    label={level}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Box>

          <CreateButton
            sx={{ display: "block", margin: "20px auto" }}
            variant="contained"
            type="submit"
          >
            Create
          </CreateButton>
        </form>
      </Card>
    </Container>
  );

			{/* Card  */}
			<Card>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifySelf: 'center',
						gap: 3,
					}}
				>
					{/* Settings session */}
					<Box sx={{ mb: 3 }}>
						{/* set Members */}
						<FormLabel>Members</FormLabel>
						<StyledSelect
							value={members}
							onChange={e => setMembers(e.target.value)}
							size='medium'
						>
							{[1, 2, 3, 4, 5].map(num => (
								<MenuItem
									key={num}
									value={num}
									style={{ background: '#F8B179' }}
								>
									{num}
								</MenuItem>
							))}
						</StyledSelect>
					</Box>

					<Box sx={{ mb: 3 }}>
						{/* set Duration */}
						<FormLabel>Duration</FormLabel>
						<StyledSelect
							value={`${duration} : min`}
							onChange={e => setDuration(e.target.value)}
							size='medium'
							renderValue={value => value}
							MenuProps={{
								MenuListProps: {
									onMouseDown: e => e.stopPropagation(),
								},
							}}
						>
							{[15, 30, 45, 60].map(time => (
								<MenuItem
									key={time}
									value={time}
									style={{ background: '#F8B179' }}
								>
									{time} : min
								</MenuItem>
							))}
							<MenuItem
								value={duration}
								style={{ background: '#F8B179' }}
								disableRipple
							>
								{/* fixed duration */}
								<TextField
									type='number'
									required
									value={duration}
									onClick={e => e.stopPropagation()}
									onKeyDown={e => e.stopPropagation()}
									onChange={handleDurationInput}
									variant='standard'
									placeholder='Enter custom time'
									sx={{
										background: '#676f9d',
										borderRadius: '4px',
										width: '100%',
										color: '#000',
									}}
									inputProps={{
										min: '0',
										style: { padding: '5px', fontSize: '1rem' },
									}}
								/>
							</MenuItem>
						</StyledSelect>
					</Box>
				</Box>

				{/* Session Difficulty */}
				<Box>
					<FormLabelBold>Difficulty</FormLabelBold>
					<DifficultyContainer>
						{['easy', 'medium', 'hard'].map(level => (
							<Box key={level} sx={{ textAlign: 'center' }}>
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
										color: '#fff',
										fontSize: '1rem',
										mt: 0.5,
										textTransform: 'capitalize',
									}}
								>
									{level}
								</Typography>
							</Box>
						))}
					</DifficultyContainer>
				</Box>

				{/* Create btn */}
				<CreateButton variant='contained' onClick={handleClick}>
					Create
				</CreateButton>
			</Card>
		</Container>
	)

}
