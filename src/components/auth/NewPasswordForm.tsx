import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { ResetPasswordFormData } from '../../types/auth';

interface NewPasswordFormProps {
  onNavigate: (screen: string) => void;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = useCallback((field: keyof ResetPasswordFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password data:', formData);
    onNavigate('login');
  }, [formData, onNavigate]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
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
          Create a New Password
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Set a new password to keep your account secure.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#333', 
              fontWeight: 500, 
              mb: 1,
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
          >
            New password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={handleChange('newPassword')}
            required
            size={isMobile ? "small" : "medium"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={togglePasswordVisibility} 
                    edge="end"
                    size={isMobile ? "small" : "medium"}
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
            }}
          />
        </Box>

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
            Confirm new password
          </Typography>
          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            required
            size={isMobile ? "small" : "medium"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={toggleConfirmPasswordVisibility} 
                    edge="end"
                    size={isMobile ? "small" : "medium"}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
          Finish Setup
        </Button>
      </form>
    </Box>
  );
};

export default NewPasswordForm;