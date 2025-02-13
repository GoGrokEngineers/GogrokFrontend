
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { SessionContext } from "../context/SessionContext";

const CodingPlatform = () => {
  const navigate = useNavigate();
  const { duration } = useContext(SessionContext) || { duration: 10 };
  const [timer, setTimer] = useState(duration * 60);

  // time counting
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      alert("Time is up");
      navigate("/leaderboard");
    }
  }, [timer, navigate]);

import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SendIcon from '@mui/icons-material/Send'
import { SessionContext } from '../context/SessionContext'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const CodingPlatform = () => {
	const { duration } = useContext(SessionContext)
	const [timer, setTimer] = useState(duration * 60)
	const navigate = useNavigate()

	// time counting
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer(prev => prev - 1)
			}, 1000)
			return () => clearInterval(interval)
		} else {
			return alert('Time is up')
		}
	}, [timer])


	// format time
	const formatTime = timer => {
		const minutes = Math.floor(timer / 60)
		const remainingSeconds = timer % 60
		return `${String(minutes).padStart(2, '0')}:${String(
			remainingSeconds
		).padStart(2, '0')}`
	}


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#161E31",
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
          borderBottom: "1px solid #2D3250",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "2rem", color: "#f8b179" }}>
          Go<span style={{ color: "#fff" }}>Grok</span>
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2D3250",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          <AccessTimeIcon sx={{ marginRight: "0.5rem", color: "#f8b179" }} />
          {/* Timer */}
          {formatTime(timer)}
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f8b179",
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
            backgroundColor: "#424669",
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
            <Typography
              sx={{
                paddingX: "15px",
                paddingY: "7px",
                color: "#fff",
                borderRadius: "5px",
                backgroundColor: "#2D3250",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover": {
                  backgroundColor: "#4e535b",
                },
              }}
            >
              Python
            </Typography>
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
                backgroundColor: "#161E31",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #2D3250",
              },
            }}
          />
        </Box>

        {/* Description */}
        <Box
          sx={{
            gridColumn: "2 / span 1",
            gridRow: "1 / span 1",
            backgroundColor: "#424669",
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
            backgroundColor: "#424669",
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
                backgroundColor: "#161E31",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #2D3250",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CodingPlatform;

	// Submit button
	const onSubmit = () => {
		navigate('/board')
	}

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: '#161E31',
				color: '#fff',
				padding: '1rem',
				overflow: 'hidden',
			}}
		>
			{/* Header */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0.5rem 1rem',
					borderBottom: '1px solid #424669',
				}}
			>
				<Typography variant='h5' sx={{ fontWeight: 'bold', color: '#F8B179' }}>
					Go<span style={{ color: '#fff' }}>Grok</span>
				</Typography>
				<Typography
					sx={{
						display: 'flex',
						alignItems: 'center',
						backgroundColor: '#424669',
						padding: '0.5rem 1rem',
						borderRadius: '5px',
					}}
				>
					<AccessTimeIcon sx={{ marginRight: '0.5rem', color: '#F8B179' }} />
					{/* Timer */}
					{formatTime(timer)}
				</Typography>
				<Box>
					<Button
						variant='contained'
						sx={{
							backgroundColor: '#F8B179',
							'&:hover': { backgroundColor: '#F8B169' },
						}}
						startIcon={<SendIcon />}
						onClick={onSubmit}
					>
						Submit
					</Button>
				</Box>
			</Box>

			{/* Main Content */}
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '2fr 1fr',
					gridTemplateRows: '3fr 1fr',
					gap: '1rem',
					height: '95%',
					padding: '1rem 0',
				}}
			>
				{/* Code Editor */}
				<Box
					sx={{
						gridColumn: '1 / span 1',
						gridRow: '1 / span 2',
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: '#424669',
						borderRadius: '8px',
						padding: '1rem',
					}}
				>
					<TextField
						multiline
						rows={28}
						placeholder='Write your code here...'
						variant='outlined'
						sx={{
							width: '100%',
							height: '100%',

							'& .MuiOutlinedInput-root': {
								color: '#fff',
								backgroundColor: '#161E31',
							},
							'& .MuiOutlinedInput-notchedOutline': {
								border: '1px solid #424669',
							},
						}}
					/>
				</Box>

				{/* Description */}
				<Box
					sx={{
						gridColumn: '2 / span 1',
						gridRow: '1 / span 1',
						backgroundColor: '#424669',
						borderRadius: '8px',
						padding: '1rem',
						overflow: 'auto',
					}}
				>
					<Typography variant='subtitle1' sx={{ marginBottom: '0.5rem' }}>
						Description
					</Typography>
					<Box
						sx={{ height: '92%', overflowY: 'auto', color: '#ccc', ml: '20px' }}
						className='scrollbar'
					>
						<Typography>
							Write the problem description here. This section is scrollable to
							handle long content. Write the problem description here.
						</Typography>
					</Box>
				</Box>

				{/* Testcase */}
				<Box
					sx={{
						gridColumn: '2 / span 1',
						gridRow: '2 / span 1',
						backgroundColor: '#424669',
						borderRadius: '8px',
						padding: '1rem',
						overflow: 'auto',
					}}
					className='scrollbar'
				>
					<Typography variant='subtitle1' sx={{ marginBottom: '0.5rem' }}>
						Testcase
					</Typography>
					<TextField
						multiline
						rows={4}
						placeholder='Write your testcase here...'
						variant='outlined'
						sx={{
							width: '100%',
							'& .MuiOutlinedInput-root': {
								color: '#fff',
								backgroundColor: '#161E31',
							},
							'& .MuiOutlinedInput-notchedOutline': {
								border: '1px solid #424669',
							},
						}}
						className='scrollbar'
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default CodingPlatform

