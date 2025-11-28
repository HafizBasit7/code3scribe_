import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
  Fade,
  Collapse,
  CircularProgress,
  Alert,
} from '@mui/material';
import type { OnboardingFormData } from '../../types/auth';

interface SignUpStep2FormProps {
  onNavigate: (screen: string) => void;
  onSubmit: (data: OnboardingFormData) => void;
  loading?: boolean;
}

// Constants for cleaner code organization
const SOFTWARE_OPTIONS = [
  'ESO Suite',
  'ImageTrend Elite',
  'ZOLL emsCharts',
  'ZOLL Online',
  'TraumaSoft',
  'AngelTrack',
  'FirstWatch',
  'Aladtec',
  'iPCR (Forté)',
  'Firehouse (ESO)',
  'StreetEMS (Digitech)',
  'AmbuPro EMS',
  'TabletPCR',
  'Beyond Lucid Tech',
  'Operative IQ',
  'ThinkParamedic',
  'SmartEMS',
  'Logis Solutions',
  'Golden Hour',
  'Medusa Siren Suite',
  'SafetyPAD (ZOLL)',
  'EMS Charts (ZOLL)',
  'Ambulance Charting Software',
  'EMS eSchedule',
  'EmergencyReporting.com',
  'ESO EHR',
  'ImageTrend Rescue',
  'ZOLL Dispatch/CAD',
  'TCP Software',
  'PeerConnect'
];

const ROLE_OPTIONS = [
  'EMT-B (Basic)',
  'EMT-A (Advanced)',
  'Paramedic (EMT-P)',
  'Critical Care Paramedic (CCP-C/FP-C)',
  'EMS Supervisor / Field Training Officer (FTO)',
  'Firefighter-EMT',
  'Firefighter-Paramedic',
  'Medical Director / Physician',
  'Nurse (Flight / MICN / EMS-related)',
  'Dispatcher / Communications Personnel',
  'Student (EMT/Paramedic Program)',
];

const AGENCY_TYPE_OPTIONS = [
  '911 Emergency Response (Municipal/County)',
  'Fire Department-based EMS',
  'Private Ambulance (911 or IFT)',
  'Air Medical / Flight EMS',
  'Tactical EMS / Law Enforcement Support',
  'Hospital-based Transport',
  'Volunteer / Rural EMS',
  'Military or DoD EMS',
  'Training/Education Program',
];

const OTHER_OPTION = 'Other (Please Specify)';

const SignUpStep2Form: React.FC<SignUpStep2FormProps> = ({ onNavigate, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<OnboardingFormData>({
    softwareName: '',
    role: '',
    agencyType: '',
  });
  
  const [customValues, setCustomValues] = useState({
    softwareName: '',
    role: '',
    agencyType: '',
  });

  const [errors, setErrors] = useState<Partial<OnboardingFormData>>({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Check if "Other" option is selected for each field
  const showSoftwareInput = formData.softwareName === OTHER_OPTION;
  const showRoleInput = formData.role === OTHER_OPTION;
  const showAgencyTypeInput = formData.agencyType === OTHER_OPTION;

  const validateForm = (): boolean => {
    const newErrors: Partial<OnboardingFormData> = {};

    // Agency Type validation
    if (!formData.agencyType.trim()) {
      newErrors.agencyType = 'Agency type is required';
    } else if (showAgencyTypeInput && !customValues.agencyType.trim()) {
      newErrors.agencyType = 'Please specify your agency type';
    }

    // Role validation
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    } else if (showRoleInput && !customValues.role.trim()) {
      newErrors.role = 'Please specify your role';
    }

    // Software Name validation
    if (!formData.softwareName.trim()) {
      newErrors.softwareName = 'Software name is required';
    } else if (showSoftwareInput && !customValues.softwareName.trim()) {
      newErrors.softwareName = 'Please specify your EMS software';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectChange = useCallback((field: keyof OnboardingFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      [field]: value 
    }));

    // Clear error when user selects an option
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // If switching away from "Other", clear the custom value
    if (value !== OTHER_OPTION) {
      setCustomValues(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleCustomInputChange = useCallback((field: keyof OnboardingFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomValues(prev => ({ ...prev, [field]: value }));
    
    // Update the main form data with custom value
    if (value.trim()) {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      // Clear error when user starts typing in custom field
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }
  }, [errors]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare final data with custom values where applicable
      const finalData: OnboardingFormData = {
        softwareName: showSoftwareInput && customValues.softwareName ? customValues.softwareName : formData.softwareName,
        role: showRoleInput && customValues.role ? customValues.role : formData.role,
        agencyType: showAgencyTypeInput && customValues.agencyType ? customValues.agencyType : formData.agencyType,
      };

      onSubmit(finalData);
    }
  }, [formData, customValues, showSoftwareInput, showRoleInput, showAgencyTypeInput, onSubmit, validateForm]);

  // Helper function to render select options with "Other" option
  const renderSelectOptions = (options: string[]) => [
    <MenuItem key="" value="">
      <em>Select an option</em>
    </MenuItem>,
    ...options.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    )),
    <MenuItem key={OTHER_OPTION} value={OTHER_OPTION}>
      {OTHER_OPTION}
    </MenuItem>
  ];

  const isFormValid = () => {
    const baseValid = formData.softwareName && formData.role && formData.agencyType;
    const customValid = 
      (!showSoftwareInput || customValues.softwareName.trim()) &&
      (!showRoleInput || customValues.role.trim()) &&
      (!showAgencyTypeInput || customValues.agencyType.trim());
    
    return baseValid && customValid;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 500 } }}>
      <Box sx={{ mb: { xs: 3, md: 3 } }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          sx={{ 
            color: '#2196F3', 
            fontWeight: 500, 
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2rem' }
          }}
        >
          Almost there
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.9rem', sm: '0.9rem' }
          }}
        >
          Complete your profile to start using your account
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Agency Type Field */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#333', 
              fontWeight: 500, 
              mb: 1,
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
          >
            What type of agency do you work for? *
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.agencyType}
            onChange={handleSelectChange('agencyType')}
            error={!!errors.agencyType}
            helperText={errors.agencyType}
            required
            disabled={loading}
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              mb: showAgencyTypeInput ? 1 : 0,
            }}
          >
            {renderSelectOptions(AGENCY_TYPE_OPTIONS)}
          </TextField>
          
          <Collapse in={showAgencyTypeInput}>
            <Fade in={showAgencyTypeInput}>
              <TextField
                fullWidth
                placeholder="Please specify your agency type"
                value={customValues.agencyType}
                onChange={handleCustomInputChange('agencyType')}
                required={showAgencyTypeInput}
                disabled={loading}
                error={!!errors.agencyType && showAgencyTypeInput}
                helperText={showAgencyTypeInput ? errors.agencyType : ''}
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                  mt: 1,
                }}
                inputProps={{
                  maxLength: 100
                }}
              />
            </Fade>
          </Collapse>
        </Box>

        {/* Role Field */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#333', 
              fontWeight: 500, 
              mb: 1,
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
          >
            What best describes your role/certification level? *
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.role}
            onChange={handleSelectChange('role')}
            error={!!errors.role}
            helperText={errors.role}
            required
            disabled={loading}
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              mb: showRoleInput ? 1 : 0,
            }}
          >
            {renderSelectOptions(ROLE_OPTIONS)}
          </TextField>
          
          <Collapse in={showRoleInput}>
            <Fade in={showRoleInput}>
              <TextField
                fullWidth
                placeholder="Please specify your role"
                value={customValues.role}
                onChange={handleCustomInputChange('role')}
                required={showRoleInput}
                disabled={loading}
                error={!!errors.role && showRoleInput}
                helperText={showRoleInput ? errors.role : ''}
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                  mt: 1,
                }}
                inputProps={{
                  maxLength: 100
                }}
              />
            </Fade>
          </Collapse>
        </Box>

        {/* Software Name Field */}
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
            Which EMS Software in use? *
          </Typography>
          <TextField
            select
            fullWidth
            value={formData.softwareName}
            onChange={handleSelectChange('softwareName')}
            error={!!errors.softwareName}
            helperText={errors.softwareName}
            required
            disabled={loading}
            size={isMobile ? "small" : "medium"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              mb: showSoftwareInput ? 1 : 0,
            }}
          >
            {renderSelectOptions(SOFTWARE_OPTIONS)}
          </TextField>
          
          <Collapse in={showSoftwareInput}>
            <Fade in={showSoftwareInput}>
              <TextField
                fullWidth
                placeholder="Please specify your EMS software"
                value={customValues.softwareName}
                onChange={handleCustomInputChange('softwareName')}
                required={showSoftwareInput}
                disabled={loading}
                error={!!errors.softwareName && showSoftwareInput}
                helperText={showSoftwareInput ? errors.softwareName : ''}
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                  mt: 1,
                }}
                inputProps={{
                  maxLength: 100
                }}
              />
            </Fade>
          </Collapse>
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading || !isFormValid()}
          size={isMobile ? "medium" : "large"}
          sx={{
            py: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 600,
            mb: 3,
            '&:disabled': {
              background: '#e0e0e0',
              color: '#9e9e9e'
            }
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Sending OTP...
            </Box>
          ) : (
            'Send Verification Code'
          )}
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
              disabled={loading}
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