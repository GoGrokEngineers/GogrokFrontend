import { useEffect, useState } from 'react'
import { Box, Typography, Button, Container, TextField } from '@mui/material'
import { Person } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const WaitingRoom = () => {
	const [membersJoined, setMembersJoined] = useState(6)
	const [maxMembers, setMaxMembers] = useState(10)
	const [sessionCode, setSessionCode] = useState('123456')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const interval = setInterval(() => {
			if (membersJoined < maxMembers) {
				setMembersJoined(prev => prev + 1)
			}
		}, 3000)

		return () => clearInterval(interval)
	}, [membersJoined, maxMembers])

	const handleStart = async () => {
		setLoading(true)
		try {
			// Send POST request to the API
			const response = await axios.post(
				'http://139.162.134.90:8000/api/competition/create',
				{
					session_code: sessionCode, // Example data
					max_members: maxMembers,
					members_joined: membersJoined,
				}
			)
			console.log('API Response:', response.data)

			// Navigate to the solving page
			navigate('/solving')
		} catch (error) {
			console.error('Error starting the session:', error)
			alert('Failed to start the session. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<Box
				sx={{
					bgcolor: '#161E31',
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Container maxWidth='lg'>
					<Box
						sx={{
							mt: 4,
						}}
					>
						{/* Logo */}
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6 }}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								pt: 4,
							}}
						>
							<Typography
								variant='h4'
								sx={{
									mb: 4,
									fontWeight: 'bold',
                  fontSize: '2.7rem',
									alignSelf: 'start',
									color: 'white',
									'& span': {
										color: '#F8B179',
									},
								}}
							>
								Go<span>Grok</span>
							</Typography>
						</motion.div>

						{/* Main Card */}
						<Box
							sx={{
								bgcolor: '#424669',
								borderRadius: 6,
								p: 4,
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							{/* User Count */}
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 1,
									mb: 3,
									mt: '2rem',
									fontWeight: 'bold',
									fontSize: '4rem',
								}}
							>
								<Person
									sx={{
										color: '#F8B179',
										fontWeight: 'bold',
										fontSize: '4.5rem',
									}}
								/>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.4 }}
								>
									<Typography
										variant='h5'
										sx={{
											color: 'white',
											fontWeight: 'bold',
											fontSize: '3rem',
											alignSelf: 'self-end',
										}}
									>
										{membersJoined} / {maxMembers}
									</Typography>
								</motion.div>
							</Box>

							{/* Waiting Text */}
							<Typography
								variant='h4'
								sx={{
									color: 'white',
									mb: 4,
									fontWeight: 'bold',
									fontSize: '2rem',
								}}
							>
								Waiting...
							</Typography>

							{/* Animated Dots */}
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}
								style={{
									display: 'flex',
									gap: '8px',
									marginBottom: '24px',
									backgroundColor: '#2D3250',
									paddingTop: '1.5rem',
									paddingBottom: '1.5rem',
									paddingLeft: '3.5rem',
									paddingRight: '3.5rem',
									borderRadius: '10px',
								}}
							>
								{[...Array(6)].map((_, i) => (
									<motion.div
										key={i}
										initial='initial'
										style={{
											width: 30,
											height: 30,
											backgroundColor: '#fff',
											borderRadius: 5,
										}}
									/>
								))}
							</motion.div>

							{/* Start Button */}
							<motion.div
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								transition={{ duration: 0.4 }}
							>
								<Button
									variant='contained'
									onClick={handleStart}
									sx={{
										bgcolor: '#F8B179',
										color: 'white',
										px: 6.5,
										py: 0.5,
										borderRadius: 2,
										mb: 5,
										textTransform: 'none',
										fontSize: '1.8rem',
										fontWeight: 'bold',
										'&:hover': {
											bgcolor: '#F8B179',
										},
									}}
								>
									Start
								</Button>
							</motion.div>
						</Box>
					</Box>
				</Container>
			</Box>
		</motion.div>
	)
}

export default WaitingRoom