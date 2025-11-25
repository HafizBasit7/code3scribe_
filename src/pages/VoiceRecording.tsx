// pages/VoiceRecording.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Mic, Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import back from '../assets/icons/back.png';

const VoiceRecording: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Sample recorded text for demonstration
  const sampleRecordedText = "Male patient, approximately 45 years old, found unconscious at the scene after a possible cardiac event. No visible injuries. Pulse is weak and irregular, around 50 bpm.";

  const startRecording = () => {
    setIsRecording(true);
    setTimer(0);
    setRecordedText('');
    
    // Simulate recording
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    // Simulate speech-to-text after 3 seconds
    setTimeout(() => {
      setRecordedText(sampleRecordedText);
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const sendToChat = () => {
    navigate(ROUTES.VOICE_CHAT, { 
      state: { initialMessage: recordedText }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'rgba(242, 246, 255, 1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Back Button */}
      <Box sx={{ 
        position: 'absolute', 
        top: { xs: 12, sm: 16 }, 
        left: { xs: 12, sm: 16 }, 
        zIndex: 1000 
      }}>
        <IconButton 
          onClick={() => navigate(-1)}
          sx={{
            // bgcolor: 'white',
            // boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: '#f5f5f5',
            }
          }}
        >
          <img
            src={back}
            alt="Back"
            style={{
              width: 24,
              height: 24,
              objectFit: 'contain',
            }}
          />
        </IconButton>
      </Box>

      {/* Main Content - Fixed to prevent bottom button hiding */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'flex-start', sm: 'center' },
        p: { xs: 2, sm: 3 },
        textAlign: 'center',
        pt: { xs: 8, sm: 4 },
        pb: { xs: 12, sm: 14 }, // Added bottom padding to prevent button overlap
        overflow: 'auto',
        minHeight: 0 // Allows proper flex behavior
      }}>
      
        {/* Instruction Text */}
        {!isRecording && !recordedText && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: { xs: 3, sm: 4 },
              px: 2,
              textAlign: "left",
              width: '100%',
              maxWidth: { xs: '100%', sm: '500px' }
            }}
          >
            {/* Text */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                color: '#2196F3',
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                lineHeight: 1.4,
                flex: 1
              }}
            >
              Click Microphone to Start
            </Typography>

            {/* Robot Image */}
            <img
              src="/assets/images/robo.png"
              alt="Assistant Robot"
              style={{
                width: isMobile ? 60 : isTablet ? 80 : 120,
                height: isMobile ? 60 : isTablet ? 80 : 120,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </Box>
        )}

        {/* Recording State */}
        {isRecording && (
          <Box sx={{ 
            width: '100%',
            maxWidth: { xs: '100%', sm: '500px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: { xs: 1, sm: 2 }
          }}>
            
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 500,
                color: '#666',
                mb: 4,
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
              }}
            >
              {formatTime(timer)}
            </Typography>

            {/* Improved Recording Animation */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 4,
              gap: { xs: 2, sm: 3 },
              width: '100%',
              position: 'relative'
            }}>
              
              {/* Enhanced Microphone Animation */}
              <Box sx={{ 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
              }}>
                {/* Pulsing circles */}
                <Box sx={{
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: 'rgba(33, 150, 243, 0.2)',
                  animation: 'pulse 2s infinite ease-out',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      opacity: 1
                    },
                    '100%': {
                      transform: 'scale(1.8)',
                      opacity: 0
                    }
                  }
                }} />
                
                <Box sx={{
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  animation: 'pulse 2s infinite ease-out 0.5s',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      opacity: 1
                    },
                    '100%': {
                      transform: 'scale(1.8)',
                      opacity: 0
                    }
                  }
                }} />
                
                {/* Main microphone */}
                <Box sx={{ 
                  width: 70, 
                  height: 70, 
                  borderRadius: '50%',
                  bgcolor: '#2196F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <Mic sx={{ 
                    color: 'white', 
                    fontSize: isMobile ? 28 : 32 
                  }} />
                </Box>
              </Box>

              {/* Robot during recording - Fixed positioning */}
              <Box sx={{
                flexShrink: 0,
                opacity: 0.8,
                position: 'absolute',
                right: { xs: -20, sm: -30, md: -40 },
                top: '50%',
                transform: 'translateY(-50%)'
              }}>
                <img
                  src="/assets/images/robo.png"
                  alt="Assistant Robot"
                  style={{
                    width: isMobile ? 60 : 100,
                    height: isMobile ? 60 : 100,
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Box>

            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                color: '#2196F3',
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '1.75rem' }
              }}
            >
              Listening
            </Typography>
          </Box>
        )}

        {/* Recorded Text Display */}
        {recordedText && (
          <Card sx={{ 
            p: { xs: 2, sm: 3 }, 
            mb: { xs: 3, sm: 4 }, 
            maxWidth: '600px',
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.6, // Fixed line height for better readability
                color: '#333',
                fontSize: { xs: '14px', sm: '16px' },
                textAlign: 'left'
              }}
            >
              {recordedText}
            </Typography>
          </Card>
        )}
      </Box>

      {/* Bottom Section - Fixed with safe area consideration */}
      <Box sx={{ 
        p: { xs: 2, sm: 3 },
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'rgba(242, 246, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        position: 'fixed', // Changed to fixed for better mobile support
        bottom: 0,
        // left: 0,
        right: 0,
        zIndex: 100,
        // Safe area for mobile devices with notches
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: { xs: '100%', sm: '500px', md: '600px' }
        }}>
          {!isRecording && !recordedText && (
            <IconButton 
              onClick={startRecording}
              sx={{
                background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
                color: 'white',
                width: { xs: 70, sm: 80 },
                height: { xs: 70, sm: 80 },
                borderRadius: '50%',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(72,139,216,1) 0%, rgba(12,87,182,1) 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Mic sx={{ fontSize: { xs: 28, sm: 30 } }} />
            </IconButton>
          )}

          {isRecording && (
            <IconButton 
              onClick={stopRecording}
              sx={{
                background: '#ff4444',
                color: 'white',
                width: { xs: 70, sm: 80 },
                height: { xs: 70, sm: 80 },
                borderRadius: '50%',
                boxShadow: '0 6px 20px rgba(255,68,68,0.4)',
                '&:hover': {
                  background: '#cc0000',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(255,68,68,0.5)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ 
                width: { xs: 18, sm: 20 }, 
                height: { xs: 18, sm: 20 }, 
                bgcolor: 'white',
                borderRadius: '2px'
              }} />
            </IconButton>
          )}

          {recordedText && (
            <Button
              onClick={sendToChat}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, rgba(193, 160, 249, 1) 0%, rgba(56, 135, 225, 1) 100%)',
                color: 'white',
                borderRadius: '25px',
                px: { xs: 3, sm: 4 },
                py: { xs: 1.25, sm: 1.5 },
                fontSize: { xs: '14px', sm: '16px' },
                fontWeight: 600,
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                minWidth: { xs: '120px', sm: '140px' },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(173, 140, 229, 1) 0%, rgba(46, 115, 205, 1) 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Send
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default VoiceRecording;