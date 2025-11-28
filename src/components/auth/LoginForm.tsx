import React, { useState, useCallback, useEffect } from 'react';
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
  useMediaQuery,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { LoginFormData } from '../../types/auth';
import { selectError, selectIsLoading } from '../../store/selectors/authSelectors';

interface LoginFormProps {
  onNavigate: (screen: string) => void;
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onNavigate, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  

  const handleChange = useCallback((field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Mark field as touched
    if (field === 'email' || field === 'password') {
      setTouched(prev => ({ ...prev, [field]: true }));
    }
  }, []);

  const handleBlur = useCallback((field: 'email' | 'password') => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted - preventDefault called');
    setTouched({ email: true, password: true });
    
    // Basic validation
    if (!formData.email || !formData.password) {
      return;
    }
    
    console.log('Calling onSubmit with data:', { email: formData.email });
    
    // Submit only email and password (API doesn't use rememberMe)
    onSubmit({
      email: formData.email.trim(),
      password: formData.password,
      rememberMe: formData.rememberMe, // This is for UI only, not sent to API
    });
  }, [formData, onSubmit]);

  // In LoginForm.tsx - add this useEffect
useEffect(() => {
  const handleBeforeUnload = () => {
    console.log('Page is about to reload!');
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Validation helpers
  const isEmailValid = !touched.email || (formData.email && /\S+@\S+\.\S+/.test(formData.email));
  const isPasswordValid = !touched.password || formData.password.length >= 6;
  const isFormValid = formData.email && formData.password && isEmailValid && isPasswordValid;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: { xs: 3, md: 3 } }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          sx={{ 
            color: '#2196F3', 
            fontWeight: 500, 
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '1.5rem', md: '1.75rem' }
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

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} autoComplete="off">
        <Box sx={{ mb: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#333', 
              fontWeight: 500, 
              mb: 1,
              fontSize: { xs: '0.875rem', sm: '0.8rem' },
              width: '100%'
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
            onBlur={handleBlur('email')}
            required
            autoComplete="email"
            name="email"
            size={isMobile ? "small" : "medium"}
            error={touched.email && !isEmailValid}
            helperText={touched.email && !isEmailValid ? "Please enter a valid email address" : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 1 }}>
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
                fontSize: { xs: '0.875rem', sm: '0.8rem' }
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
                  title="Password must contain at least 6 characters"
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
            onBlur={handleBlur('password')}
            required
            autoComplete="current-password"
            name="password"
            size={isMobile ? "small" : "medium"}
            error={touched.password && !isPasswordValid}
            helperText={touched.password && !isPasswordValid ? "Password must be at least 6 characters" : ""}
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
          mb: 1, 
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
            disabled={isLoading}
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
            disabled={!isFormValid || isLoading}
            sx={{
              py: { xs: 1.5, sm: 1.8 },
              borderRadius: 2,
              background: isFormValid && !isLoading 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : '#e0e0e0',
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 600,
              mb: 3,
              '&:disabled': {
                background: '#e0e0e0',
                color: '#9e9e9e'
              }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
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
              disabled={isLoading}
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