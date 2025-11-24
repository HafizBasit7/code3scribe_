import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
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

  const handleChange = (field: keyof OnboardingFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ color: '#2196F3', fontWeight: 500, mb: 2 }}>
          Almost there
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Wrap up the signup to start using your account.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, mb: 1 }}>
            What type of agency do you work for?
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.agencyType}
            onChange={handleChange('agencyType')}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {/* <MenuItem value="">What type of agency do you work for?</MenuItem> */}
            {agencyTypeOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, mb: 1 }}>
            What best describe your role/certification level?
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.role}
            onChange={handleChange('role')}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {/* <MenuItem value="">What best describe your role/certification level?</MenuItem> */}
            {roleOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, mb: 1 }}>
            What type of agency do you work for?
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.softwareName}
            onChange={handleChange('softwareName')}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {/* <MenuItem value="">What type of agency do you work for?</MenuItem> */}
            {softwareOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
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
            mb: 3,
          }}
        >
          Sign up
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Already have an account?{' '}
            <Button
              variant="text"
              onClick={() => onNavigate('login')}
              sx={{ color: '#2196F3', fontWeight: 600 }}
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