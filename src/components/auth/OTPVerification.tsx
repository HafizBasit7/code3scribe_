import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface OTPVerificationProps {
  onNavigate: (screen: string) => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ onNavigate }) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification code:', code.join(''));
    onNavigate('create-password');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => onNavigate('forgot-password')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ color: '#2196F3', fontWeight: 500, mb: 2 }}>
          Enter Verification Code
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          We've sent a code to <strong>hello.user@code3scribe.com</strong>
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
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
                  fontSize: '24px', 
                  fontWeight: 600,
                  padding: '12px'
                },
              }}
              sx={{
                width: 60,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          ))}
        </Box>

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mb: 4 }}>
          Didn't get a code?{' '}
          <Button
            variant="text"
            sx={{ color: '#2196F3', fontWeight: 600 }}
          >
            Click to resend.
          </Button>
        </Typography>

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
          }}
        >
          Verify
        </Button>
      </form>
    </Box>
  );
};

export default OTPVerification;