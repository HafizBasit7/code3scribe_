import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
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
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = useCallback((field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
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
          Welcome Back
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Log in to access your account.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit} autoComplete="off">
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
            autoComplete="current-password"
            name="password"
            size={isMobile ? "small" : "medium"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={togglePasswordVisibility} 
                    edge="end"
                    type="button"
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

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4, 
          width: '100%',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 1, sm: 0 }
        }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange('rememberMe')}
                color="primary"
                name="rememberMe"
                size={isMobile ? "small" : "medium"}
              />
            }
            label={
              <Typography sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' } }}>
                Remember me
              </Typography>
            }
          />
          <Button
            variant="text"
            onClick={() => onNavigate('forgot-password')}
            sx={{ 
              color: '#2196F3', 
              fontWeight: 500,
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
            type="button"
          >
            Forgot Password?
          </Button>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size={isMobile ? "medium" : "large"}
            sx={{
              py: { xs: 1.5, sm: 1.8 },
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 600,
              mb: 3,
            }}
          >
            Next
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
          >
            Don't have an account?{' '}
            <Button
              variant="text"
              onClick={() => onNavigate('signup')}
              sx={{ 
                color: '#2196F3', 
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '0.9rem' }
              }}
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