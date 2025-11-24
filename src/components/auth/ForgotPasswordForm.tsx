import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import type { ForgotPasswordFormData } from '../../types/auth';

interface ForgotPasswordFormProps {
  onNavigate: (screen: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Forgot password email:', email);
    onNavigate('verification');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => onNavigate('login')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ color: '#2196F3', fontWeight: 500, mb: 2 }}>
          Forgot Password?
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          We'll send you the updated instruction shortly
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, mb: 1 }}>
            Email address
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            py: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPasswordForm;