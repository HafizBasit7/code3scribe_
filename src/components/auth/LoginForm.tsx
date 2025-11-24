import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { LoginFormData } from '../../types/auth';

interface LoginFormProps {
  onNavigate: (screen: string) => void;
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onNavigate, onSubmit }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ color: '#2196F3', fontWeight: 500, mb: 2 }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Log in to access your account.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit} autoComplete="off">
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, mb: 1 }}>
            Email address
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange('email')}
            required
            autoComplete="email"
            name="email"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              width: '100%', // Full width
              maxWidth: '600px', // Increased width
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
              Password
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid #2196F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Tooltip
  title="Password must contain at least 8 characters, be alphanumeric, include at least one capital letter, and at least one symbol."
  arrow
  placement="right"
>
  <Typography 
    variant="caption" 
    sx={{ 
      color: '#2196F3', 
      fontSize: '12px', 
      cursor: 'pointer', 
      display: 'inline-flex', 
      alignItems: 'center'
    }}
  >
    i
  </Typography>
</Tooltip>
              </Box>
            </Box>
          </Box>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange('password')}
            required
            autoComplete="current-password"
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)} 
                    edge="end"
                    type="button"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              width: '100%', // Full width
              maxWidth: '600px', // Increased width
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, width: '100%', maxWidth: '600px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange('rememberMe')}
                color="primary"
                name="rememberMe"
              />
            }
            label="Remember me"
          />
          <Button
            variant="text"
            onClick={() => onNavigate('forgot-password')}
            sx={{ color: '#2196F3', fontWeight: 500 }}
            type="button"
          >
            Forgot Password?
          </Button>
        </Box>

        <Box sx={{ width: '100%', maxWidth: '600px' }}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1.8,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '16px',
              fontWeight: 600,
              mb: 3,
            }}
          >
            Next
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Don't have an account?{' '}
            <Button
              variant="text"
              onClick={() => onNavigate('signup')}
              sx={{ color: '#2196F3', fontWeight: 600 }}
              type="button"
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;