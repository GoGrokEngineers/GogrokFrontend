import React, { useContext, useEffect, useState } from 'react'
import {
	Box,
	Button,
	TextField,
	Typography,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SendIcon from '@mui/icons-material/Send'
import { SessionContext } from '../context/SessionContext'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { GetData, RemoveData } from '../localstorage/savedata'

const CodingPlatform = () => {
	const { duration } = useContext(SessionContext)
	const [timer, setTimer] = useState(duration * 60)
	const [language, setLanguage] = useState('python')
	const navigate = useNavigate()

	// Load timer from local storage
	useEffect(() => {
		const savedData = GetData('data')
		setTimer(savedData.duration * 60)
	}, [])

	// Countdown logic
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1)
			}, 1000)
			return () => clearInterval(interval)
		} else if (timer === 0) {
			return RemoveData('data')
		}
	}, [timer])

	// Format timer for display
	const formatTime = (timer) => {
		const minutes = Math.floor(timer / 60)
		const remainingSeconds = timer % 60
		return `${String(minutes).padStart(2, '0')}:${String(
			remainingSeconds
		).padStart(2, '0')}`
	}

	// Navigate on submit
	const onSubmit = () => {
		navigate('/leaderboard')
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
					{formatTime(timer)}
				</Typography>
				<Box>
					<Button
						variant='contained'
						sx={{
							color: '#fff',
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
					{/* Language Selector */}
					<FormControl fullWidth sx={{ mb: 2 }}>
						<InputLabel sx={{ color: '#fff' }}>Language</InputLabel>
						<Select
							value={language}
							label='Language'
							onChange={(e) => setLanguage(e.target.value)}
							sx={{
								color: '#fff',
								backgroundColor: '#161E31',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: '#fff',
								},
								'& .MuiSvgIcon-root': {
									color: '#fff',
								},
							}}

							MenuProps={{
								PaperProps: {
									sx: {
										color: '#222'
									},
								},
							}}
						>
							<MenuItem value='python'>Python</MenuItem>

						</Select>
					</FormControl>

					{/* Code Input */}
					<TextField
						multiline
						rows={20}
						placeholder={`Write your ${language} code here...`}
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
