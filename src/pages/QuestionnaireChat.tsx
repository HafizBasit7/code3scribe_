// pages/QuestionnaireChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Card,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { Send, Mic } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import back from '../assets/icons/back.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const QuestionnaireChat: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Please describe the patient's condition or concern",
      sender: 'ai',
      timestamp: '12:45 PM'
    },
    {
      id: '2',
      text: "Patient name is John Doe. He had a cardiac arrest. It happened on Downtown Street. We arrived, found him unresponsive with no pulse. Started CPR immediately. AED was applied, delivered one shock. Got a pulse back after a few minutes. Transported him to the nearest hospital. Bystanders said he collapsed suddenly while walking.",
      sender: 'user',
      timestamp: '12:45 PM'
    },
    {
      id: '3',
      text: "Has the patient had a heart attack before?",
      sender: 'ai',
      timestamp: '12:45 PM'
    },
    {
      id: '4',
      text: "No, the patient has not had any heart attacks before.",
      sender: 'user',
      timestamp: '12:45 PM'
    },
    {
      id: '5',
      text: "What is the patient's age?",
      sender: 'ai',
      timestamp: '12:45 PM'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "Thank you for that information. What medications is the patient currently taking?",
        "Can you describe the patient's vital signs when you arrived?",
        "Was there any family history of heart disease?",
        "Did the patient experience any chest pain before collapsing?",
        "What was the patient's level of consciousness when you arrived?"
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'rgba(242, 246, 255, 1)',
      overflow: 'hidden'
    }}>
      {/* Back Button at Top Left */}
      <Box sx={{ 
        position: 'relative', 
        top: { xs: 12, sm: 16 }, 
        left: { xs: 12, sm: 16 }, 
        zIndex: 1000 
      }}>
        <IconButton 
          onClick={() => navigate(-1)}
          sx={{
            '&:hover': {
              bgcolor: '#f5f5f5',
            },
            width: { xs: 44, sm: 48 },
            height: { xs: 44, sm: 48 }
          }}
        >
          <img
            src={back}
            alt="Back"
            style={{
              width: 34,
              height: 34,
              objectFit: 'contain',
              imageRendering: "crisp-edges",
              transform: 'translateZ(0)',
            }}
          />
        </IconButton>
      </Box>

      {/* Chat Messages Area */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: '#f5f5f5'
      }}>
        {/* Messages Container */}
        <Box sx={{ 
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, sm: 3 },
          bgcolor: '#f5f5f5',
          pb: { xs: 1, sm: 2 }
        }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: { xs: 2.5, sm: 3 },
                px: { xs: 0.5, sm: 1 }
              }}
            >
              {/* Message Bubble */}
              <Box
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  maxWidth: { xs: '90%', sm: '85%', md: '80%', lg: '75%' },
                  borderRadius: { xs: '30px', sm: '40px' },
                  background: message.sender === 'user' 
                    ? 'linear-gradient(135deg, rgba(193, 160, 249, 1) 0%, rgba(56, 135, 225, 1) 100%)' 
                    : '#ffffff',
                  color: message.sender === 'user' ? 'white' : '#333333',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: message.sender === 'ai' ? '1px solid #e0e0e0' : 'none',
                  position: 'relative'
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.5, 
                    fontSize: { xs: '14px', sm: '15px', md: '16px' },
                    fontWeight: message.sender === 'ai' ? 400 : 400
                  }}
                >
                  {message.text}
                </Typography>
                
                {/* Timestamp */}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute',
                    bottom: { xs: '-18px', sm: '-20px' },
                    right: message.sender === 'user' ? { xs: '6px', sm: '8px' } : 'auto',
                    left: message.sender === 'ai' ? { xs: '6px', sm: '8px' } : 'auto',
                    color: '#666',
                    fontSize: { xs: '11px', sm: '12px' },
                    fontWeight: 500
                  }}
                >
                  {message.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          alignItems: 'flex-end',
          margin: '0 auto',
          p: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: { xs: '100%', sm: '800px', md: '1000px', lg: '1200px' },
          pb: { xs: 2, sm: 3 } // Added bottom padding for mobile safety
        }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Chat with AI..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="medium"
            InputProps={{
              endAdornment: (
                <IconButton 
                  onClick={handleSendMessage}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(193, 160, 249, 1) 0%, rgba(56, 135, 225, 1) 100%)',
                    color: 'white',
                    width: { xs: '36px', sm: '40px' },
                    height: { xs: '36px', sm: '40px' },
                    borderRadius: '20px',
                    mr: 1,
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(173, 140, 229, 1) 0%, rgba(46, 115, 205, 1) 100%)',
                    },
                    '&:disabled': {
                      background: '#bdbdbd',
                    }
                  }}
                >
                  <Send fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                bgcolor: '#f8f9fa',
                minHeight: { xs: '50px', sm: '60px' },
                alignItems: 'flex-end',
                paddingRight: '8px',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#2196F3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196F3',
                  borderWidth: '1px',
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '14px', sm: '16px' },
                  color: '#333',
                  padding: { xs: '12px 16px', sm: '16px 20px' },
                  '&::placeholder': {
                    color: '#999',
                    opacity: 1,
                  }
                }
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionnaireChat;