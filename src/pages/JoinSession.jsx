// src/pages/JoinSession.jsx
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useJoinCompetition } from '../hooks/useJoinCompetition';
import { WsConnection, SendData } from '../services/web-socket';

export default function JoinSession() {
  const [uid, setUid] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { mutate: join, isLoading } = useJoinCompetition();

  const handleJoin = () => {
    if (!uid || !username) {
      toast.warn('Please enter both session ID and username');
      return;
    }

    join(
      { competition_uid: uid, username },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
          // Save both to localStorage
          localStorage.setItem(
            'data',
            JSON.stringify({ uid, username })
          );
          // establish WebSocket connection
          WsConnection(uid)
            .then(() => {
              // optionally send “I joined” event
              SendData({ type: 'join', username });
              navigate('/waiting');
            })
            .catch(err => {
              toast.error('WebSocket error');
              console.error(err);
            });
        },
        onError: err => {
          toast.error(
            err.response?.data?.detail || 'Failed to join session'
          );
        },
      }
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 8,
      }}
    >
      <Typography variant="h4">Join a GoGrok Session</Typography>
      <TextField
        label="Session ID"
        value={uid}
        onChange={e => setUid(e.target.value)}
      />
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleJoin}
        disabled={isLoading}
      >
        {isLoading ? 'Joining…' : 'Join'}
      </Button>
    </Box>
  );
}
