import { useContext, useEffect, useState } from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { Person } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SessionContext } from '../context/SessionContext'
import OTPInput from './ui/opt-input'
import { Bounce, toast } from 'react-toastify'

const WaitingRoom = () => {
	const [membersJoined, setMembersJoined] = useState(0)
	const { members, value, setValue, role } = useContext(SessionContext)
	const [loading, setLoading] = useState(false)
	const [hasWarned, setHasWarned] = useState(false)

	useEffect(() => {
		if(!value) {
			navigate('/')
		}
	})

	const navigate = useNavigate()

	const handleStart = async () => {
		setLoading(true)
		try {
			// Send POST request to the API
			const response = await axios.post(
				'http://139.162.134.90:8000/api/competition/'
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

	const changeNumber = () => {
		if (setValue) {
			if (!hasWarned) {
				// Faqat 1 marta va keyingi 3 sekundan keyin ishlaydi
				toast.warn("You can't change number!", {
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

				setHasWarned(true) // Flagni true qilish
				setTimeout(() => setHasWarned(false), 4000) // 3 sekunddan keyin qayta ishlaydi
			}
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
								onClick={() => navigate('/')}
								sx={{
									mb: 4,
									fontWeight: 'bold',
									fontSize: '2.7rem',
									alignSelf: 'start',
									cursor: 'pointer',
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
										{membersJoined} / {members}
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

							{/* disabled OTP input */}
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
								<OTPInput
									separator={<span>-</span>}
									value={value && value}
									onChange={changeNumber}
									disabled={loading}
									length={6}
									style={{
										cursor: 'not-allowed',
									}}
								/>
							</motion.div>

							{/* Start Button */}
							<motion.div
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								transition={{ duration: 0.4 }}
							>
								{role === 'joiner' ? (
									<Button
									variant='contained'
									disabled={loading}
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
									Ready
								</Button>
								): 'creater' && (
									<Button
									variant='contained'
									disabled={loading}
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
								)}
								
							</motion.div>
						</Box>
					</Box>
				</Container>
			</Box>
		</motion.div>
	)
}

export default WaitingRoom
