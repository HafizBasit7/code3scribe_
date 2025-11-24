import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { SignUpFormData } from '../../types/auth';

interface SignUpFormProps {
  onNavigate: (screen: string) => void;
  onSubmit: (data: SignUpFormData) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onNavigate, onSubmit }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = useCallback((field: keyof SignUpFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 500 } }}>
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
          Join Now
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Complete your signup to create your account and get started
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#333', 
                fontWeight: 500, 
                mb: 1,
                fontSize: { xs: '0.875rem', sm: '0.9rem' }
              }}
            >
              First Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              required
              size={isMobile ? "small" : "medium"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#333', 
                fontWeight: 500, 
                mb: 1,
                fontSize: { xs: '0.875rem', sm: '0.9rem' }
              }}
            >
              Last Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              required
              size={isMobile ? "small" : "medium"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
        </Grid>

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
            Email Address
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange('email')}
            required
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

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
            Phone Number
          </Typography>
          <TextField
            fullWidth
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange('phoneNumber')}
            required
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 1,
            flexWrap: 'wrap',
            gap: 1
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#333', 
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '0.9rem' }
              }}
            >
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
                  placement={isMobile ? "bottom" : "right"}
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
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
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
            mb: 3,
          }}
        >
          Next
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
          >
            Already have an account?{' '}
            <Button
              variant="text"
              onClick={() => onNavigate('login')}
              sx={{ 
                color: '#2196F3', 
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '0.9rem' }
              }}
            >
              Login
            </Button>
          </Typography>
        </Box>

        {/* Progress Indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#2196F3' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#e0e0e0' }} />
        </Box>
      </form>
    </Box>
  );
};

export default SignUpForm;