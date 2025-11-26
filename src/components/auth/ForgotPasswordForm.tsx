import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface ForgotPasswordFormProps {
  onNavigate: (screen: string) => void;
   onSubmit?: () => void
}


const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onNavigate, onSubmit }) => {
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Forgot password email:', email);
    onSubmit?.();
    onNavigate('verification');
  }, [email, onNavigate]);

  const handleBack = useCallback(() => {
    onNavigate('login');
  }, [onNavigate]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 3, md: 4 } }}>
        <IconButton 
          onClick={handleBack} 
          sx={{ mr: 2 }}
          size={isMobile ? "small" : "medium"}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          sx={{ 
            color: '#2196F3', 
            fontWeight: 500, 
            mb: 2,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          Forgot Password?
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          We'll send you the updated instruction shortly
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#333', 
              fontWeight: 500, 
              mb: 1,
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
          >
            Email address
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size={isMobile ? "small" : "medium"}
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
          size={isMobile ? "medium" : "large"}
          sx={{
            py: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: { xs: '14px', sm: '16px' },
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