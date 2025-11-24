import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import type { OnboardingFormData } from '../../types/auth';

interface SignUpStep2FormProps {
  onNavigate: (screen: string) => void;
  onSubmit: (data: OnboardingFormData) => void;
}

const SignUpStep2Form: React.FC<SignUpStep2FormProps> = ({ onNavigate, onSubmit }) => {
  const [formData, setFormData] = useState<OnboardingFormData>({
    softwareName: '',
    role: '',
    agencyType: '',
  });

  const softwareOptions = ['ePCR Pro', 'MedFlow'];
  const roleOptions = ['User', 'Admin'];
  const agencyTypeOptions = ['Fire Department', 'EMS Service'];
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = useCallback((field: keyof OnboardingFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

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
          Almost there
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Wrap up the signup to start using your account.
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
            What type of agency do you work for?
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.agencyType}
            onChange={handleChange('agencyType')}
            required
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {agencyTypeOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
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
            What best describe your role/certification level?
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.role}
            onChange={handleChange('role')}
            required
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {roleOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
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
            What type of agency do you work for?
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.softwareName}
            onChange={handleChange('softwareName')}
            required
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {softwareOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
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
          Sign up
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
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#e0e0e0' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#2196F3' }} />
        </Box>
      </form>
    </Box>
  );
};

export default SignUpStep2Form;