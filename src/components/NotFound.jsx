import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a202c',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      {/* Error Message */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          marginBottom: '1rem',
          animation: 'fadeIn 2s ease-in-out',
        }}
      >
        Oops! Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          marginBottom: '2rem',
          animation: 'fadeIn 2s ease-in-out 1s',
        }}
      >
        Sorry, the page you are looking for doesn't exist or has been moved.
      </Typography>

      {/* Button to go back to home */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#ff7f50',
          '&:hover': { backgroundColor: '#e76642' },
          animation: 'fadeIn 2s ease-in-out 2s',
        }}
        onClick={() => navigate('/')} 
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
