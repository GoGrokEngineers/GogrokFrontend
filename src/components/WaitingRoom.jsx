import { useContext, useEffect, useState } from 'react'
import { Box, Typography, Button, Container, IconButton } from '@mui/material'
import { Person } from '@mui/icons-material'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
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
	const navigate = useNavigate()

	useEffect(() => {
		if (!value) {
			navigate('/')
		}
	}, [value, navigate])

	const handleStart = async () => {
		setLoading(true)
		try {
			navigate('/solving')
		} catch (error) {
			console.error('Error starting the session:', error)
			alert('Failed to start the session. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const changeNumber = () => {
		if (setValue && !hasWarned) {
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
			setHasWarned(true)
			setTimeout(() => setHasWarned(false), 4000)
		}
	}

	const handleCopy = () => {
		if (!toast.isActive('copy-toast')) {
			// Agar toast allaqachon ko'rinayotgan bo'lsa, yana ko'rsatmaydi
			navigator.clipboard.writeText(value)
			toast.success('Code copied to clipboard!', {
				theme: 'dark',
				toastId: 'copy-toast', // Bir xil ID bo'lsa, qayta ko'rsatilmaydi
			})
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
					<Box sx={{ mt: 4 }}>
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6 }}
						>
							<Typography
								variant='h4'
								onClick={() => navigate('/')}
								sx={{
									mb: 4,
									fontWeight: 'bold',
									fontSize: '2.7rem',
									cursor: 'pointer',
									color: 'white',
									'& span': { color: '#F8B179' },
								}}
							>
								Go<span>Grok</span>
							</Typography>
						</motion.div>
						<Box
							sx={{
								bgcolor: '#424669',
								borderRadius: 6,
								p: 4,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 1,
									mb: 3,
									mt: '2rem',
								}}
							>
								<Person sx={{ color: '#F8B179', fontSize: '4.5rem' }} />
								<Typography
									variant='h5'
									sx={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}
								>
									{membersJoined} / {members}
								</Typography>
							</Box>
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
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									marginBottom: '24px',
									backgroundColor: '#2D3250',
									padding: '1.5rem',
									borderRadius: '10px',
								}}
							>
								<OTPInput
									separator={<span>-</span>}
									value={value}
									onChange={changeNumber}
									disabled={loading}
									length={6}
									style={{ cursor: 'not-allowed' }}
								/>
								<IconButton onClick={handleCopy} sx={{ color: '#F8B179' }}>
									<ContentCopyRoundedIcon fontSize='large' />
								</IconButton>
							</motion.div>
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
									'&:hover': { bgcolor: '#F8B179' },
								}}
							>
								{role === 'joiner' ? 'Ready' : 'Start'}
							</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</motion.div>
	)
}

export default WaitingRoom
