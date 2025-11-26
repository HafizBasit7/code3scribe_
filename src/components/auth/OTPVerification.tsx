import React, { useState, useRef, useCallback } from 'react';
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

interface OTPVerificationProps {
  onNavigate: (screen: string) => void;
  onSuccess?: () => void;
  flowContext?: 'signup' | 'forgot-password'; // Add this prop
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  onNavigate, 
  onSuccess,
  flowContext = 'signup' // Default to signup
}) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleCodeChange = useCallback((index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }, [code]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [code]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification code:', code.join(''));
    
    // Call onSuccess which will handle routing based on flowContext
    onSuccess?.();
  }, [code, onSuccess]);

  // Smart back navigation based on flow context
  const handleBack = useCallback(() => {
    if (flowContext === 'signup') {
      onNavigate('signup-step2');
    } else {
      onNavigate('forgot-password');
    }
  }, [flowContext, onNavigate]);

  // Dynamic text based on flow context
  const getHeaderText = () => {
    return flowContext === 'signup' 
      ? 'Enter Verification Code' 
      : 'Verify Your Identity';
  };

  const getSubheaderText = () => {
    return flowContext === 'signup'
      ? 'We sent a code to verify your account'
      : 'We sent a code to reset your password';
  };

  const getButtonText = () => {
    return flowContext === 'signup' ? 'Verify & Continue' : 'Verify & Reset Password';
  };

  const otpInputSize = isMobile ? 45 : isTablet ? 55 : 60;
  const otpFontSize = isMobile ? '18px' : isTablet ? '20px' : '24px';
  const otpPadding = isMobile ? '8px' : '12px';

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
          {getHeaderText()}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          {getSubheaderText()}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            mt: 1
          }}
        >
          Code sent to: <strong>hello.user@code3scribe.com</strong>
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, sm: 2 }, 
          mb: { xs: 3, md: 4 }, 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputProps={{
                maxLength: 1,
                style: { 
                  textAlign: 'center', 
                  fontSize: otpFontSize, 
                  fontWeight: 600,
                  padding: otpPadding
                },
              }}
              sx={{
                width: otpInputSize,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
              size={isMobile ? "small" : "medium"}
            />
          ))}
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center', 
            color: '#666', 
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '0.875rem', sm: '0.9rem' }
          }}
        >
          Didn't get a code?{' '}
          <Button
            variant="text"
            sx={{ 
              color: '#2196F3', 
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '0.9rem' }
            }}
          >
            Click to resend.
          </Button>
        </Typography>

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
          {getButtonText()}
        </Button>
      </form>
    </Box>
  );
};

export default OTPVerification;