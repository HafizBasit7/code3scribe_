// components/auth/OTPVerification.tsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { sendVerificationCode } from '../../services/authApi';

interface OTPVerificationProps {
  onNavigate: (screen: string, params?: any) => void;
  onSuccess: (code: string, userData?:any) => void;
  flowContext?: 'signup' | 'forgot-password';
  userData?: {
    phoneNumber: string;
    email: string;
    userData?: any;
  };
  loading?: boolean;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  onNavigate, 
  onSuccess,
  flowContext = 'signup',
  userData,
  loading = false
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showVerifyingModal, setShowVerifyingModal] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Show verifying modal when loading starts
  useEffect(() => {
    if (loading) {
      setShowVerifyingModal(true);
    } else {
      setShowVerifyingModal(false);
    }
  }, [loading]);

  const handleCodeChange = useCallback((index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError('');
      
      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
      
      // Auto-submit when all digits are entered
      if (newCode.every(digit => digit !== '') && index === 5) {
        handleSubmit(newCode.join(''));
      }
    }
  }, [code]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [code]);

// In OTPVerification.tsx - just update the handleSubmit function
const handleSubmit = useCallback(async (verificationCode?: string) => {
  const finalCode = verificationCode || code.join('');
  
  if (finalCode.length !== 6) {
    setError('Please enter the complete 6-digit code');
    return;
  }

  if (!/^\d{6}$/.test(finalCode)) {
    setError('Please enter a valid 6-digit code');
    return;
  }

  try {
    // Pass userData to onSuccess for subscription initialization
    await onSuccess(finalCode, userData);
  } catch (error) {
    setError('Verification failed. Please try again.');
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  }
}, [code, onSuccess, userData]);

  const handleResendCode = useCallback(async () => {
    if (resendCooldown > 0) return;

    try {
      if (userData?.phoneNumber && userData?.email) {
        console.log('Resending OTP to:', userData.phoneNumber, userData.email);
        await sendVerificationCode(userData.phoneNumber, userData.email);
        setResendCooldown(30);
        setError('');
      } else {
        setError('Phone number or email not available for resending OTP');
      }
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    }
  }, [resendCooldown, userData]);

  const handleBack = useCallback(() => {
    onNavigate('signup-step2');
  }, [onNavigate]);

  const getHeaderText = () => 'Enter Verification Code';

  const getSubheaderText = () => {
    const phoneNumber = userData?.phoneNumber ? `${userData.phoneNumber}` : 'your phone';
    return `We sent a verification code to ${phoneNumber}`;
  };

  const getButtonText = () => 'Verify & Continue';

  const getVerifyingModalText = () => 'Verifying OTP and creating your account...';

  const otpInputSize = isMobile ? 45 : isTablet ? 55 : 60;
  const otpFontSize = isMobile ? '18px' : isTablet ? '20px' : '24px';

  console.log('OTP Verification User Data:', userData);

  return (
    <Box sx={{ width: '100%' }}>
      <Dialog open={showVerifyingModal} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CircularProgress size={50} sx={{ mb: 2, color: '#2196F3' }} />
            <Typography variant="h6" sx={{ mb: 1, color: '#333', fontWeight: 600 }}>
              Verifying OTP
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {getVerifyingModalText()}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 3, md: 4 } }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }} disabled={loading}>
          <ArrowBack />
        </IconButton>
      </Box>

      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant={isMobile ? "h4" : "h3"} sx={{ color: '#2196F3', fontWeight: 500, mb: 2 }}>
          {getHeaderText()}
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 1 }}>
          {getSubheaderText()}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Enter the 6-digit code sent to your phone
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, mb: 2, justifyContent: 'center' }}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={loading}
              inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: otpFontSize, fontWeight: 600 } }}
              sx={{ width: otpInputSize, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              size={isMobile ? "small" : "medium"}
            />
          ))}
        </Box>

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
          Didn't receive the code?{' '}
          <Button 
            variant="text" 
            onClick={handleResendCode} 
            disabled={resendCooldown > 0 || loading}
            sx={{ 
              color: resendCooldown > 0 ? '#999' : '#2196F3', 
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '0.9rem' },
              minWidth: 'auto'
            }}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
          </Button>
        </Typography>
      </Box>

      <Button
        fullWidth
        type="button"
        variant="contained"
        onClick={() => handleSubmit()}
        disabled={loading || code.join('').length !== 6}
        size={isMobile ? "medium" : "large"}
        sx={{
          py: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontSize: { xs: '14px', sm: '16px' },
          fontWeight: 600,
          '&:disabled': {
            background: '#e0e0e0',
            color: '#9e9e9e'
          }
        }}
      >
        {getButtonText()}
      </Button>
    </Box>
  );
};

export default OTPVerification;