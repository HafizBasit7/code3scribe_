// pages/VoiceChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Card,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';
import { Send, MoreVert } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/icons/back.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isReport?: boolean;
}

const VoiceChat: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [hasGeneratedInitialReport, setHasGeneratedInitialReport] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use a ref to track if we've generated the initial report
  const hasGeneratedReportRef = useRef(false);

  // Initialize with the recorded text from voice recording - FIXED: Only generate report once
  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    if (initialMessage && messages.length === 0 && !hasGeneratedReportRef.current) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: initialMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([userMessage]);
      hasGeneratedReportRef.current = true;
      
      // Generate AI response after a delay - ONLY ONCE
      setTimeout(() => {
        generateAIResponse(initialMessage);
      }, 1000);
    }
  }, [location.state, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string, isEdit: boolean = false) => {
    if (isEdit) {
      // For edits, generate a simple acknowledgment
      const aiResponse: Message = {
        id: Date.now().toString(),
        text: "Thank you for updating the information. I've revised the assessment based on your changes.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      return;
    }

    // Use functional update to ensure we're checking the latest state
    setMessages(prev => {
      // Check if we already have a report in the current state
      const hasExistingReport = prev.some(msg => msg.isReport);
      
      if (!hasExistingReport) {
        // Generate the main report only if it doesn't exist
        const aiReport: Message = {
          id: Date.now().toString(),
          text: `**EMS Case Report**

**Case ID:** #MD-AI-20250408-001  
**Date:** ${new Date().toLocaleDateString()}  
**Time:** ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  
**Respondent:** Emily Carter (Paramedic)  
**Team:** Unit 47 - Downtown Response Team  

**Patient Information**

Based on your description: ${userMessage}

**Assessment:** 
Patient presents with symptoms consistent with cardiac arrest. Immediate CPR and AED intervention were appropriate. Transport to hospital for further evaluation and treatment is recommended.

**Next Steps:**
1. Continue monitoring vital signs
2. Prepare for hospital handoff
3. Document all interventions`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isReport: true
        };
        
        return [...prev, aiReport];
      }
      
      return prev;
    });
  };

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

    // Simulate AI response after a delay - only for regular chat, not reports
    setTimeout(() => {
      const aiResponses = [
        "Thank you for the additional information. I've updated the patient assessment.",
        "That information helps clarify the situation. The patient's condition appears stable for transport.",
        "Understood. I'll incorporate this into the final report for hospital handoff.",
        "Noted. This additional context is helpful for the medical team.",
        "Thank you for clarifying. I've adjusted the recommendations accordingly."
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

  const handleEditMessage = (messageId: string, currentText: string) => {
    setEditingMessageId(messageId);
    setInputText(currentText);
    setMenuAnchorEl(null);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
    alert('Text copied to clipboard!');
    setMenuAnchorEl(null);
  };

  const handleSaveEdit = () => {
    if (editingMessageId && inputText.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === editingMessageId ? { ...msg, text: inputText } : msg
      ));
      setEditingMessageId(null);
      setInputText('');
      
      // Regenerate AI response if editing user message - but not the full report
      const editedMessage = messages.find(msg => msg.id === editingMessageId);
      if (editedMessage?.sender === 'user') {
        setTimeout(() => {
          // For edits, just send a simple acknowledgment, not a full report
          const editResponse: Message = {
            id: Date.now().toString(),
            text: "Thank you for updating the information. I've revised the assessment based on your changes.",
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, editResponse]);
        }, 1000);
      }
    }
  };

  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, message: Message) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedMessage(message);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedMessage(null);
  };

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'rgba(242, 246, 255, 1)',
      overflow: 'hidden'
    }}>
      {/* Back Button */}
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

      {/* 24 Hours Deletion Warning */}
      <Box sx={{ 
        p: { xs: 1.5, sm: 2 },
        textAlign: 'center',
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#856404',
            fontWeight: 500,
            fontSize: { xs: '13px', sm: '14px' }
          }}
        >
          All responses will be deleted after 24 hours
        </Typography>
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
          bgcolor: '#f5f5f5'
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
                  p: { xs: 2, sm: 3 },
                  maxWidth: { xs: '85%', sm: '75%', md: '65%', lg: '55%' },
                  borderRadius: '20px',
                  background: message.sender === 'user' 
                    ? 'linear-gradient(135deg, rgba(193, 160, 249, 1) 0%, rgba(56, 135, 225, 1) 100%)' 
                    : 'rgba(82, 149, 226, 1)',
                  color: 'white',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  border: message.sender === 'ai' ? '1px solid #e0e0e0' : 'none',
                  position: 'relative'
                }}
              >
                {message.isReport ? (
                  // Report Formatting - All white text
                  <Box sx={{ 
                    whiteSpace: 'pre-line',
                    fontSize: { xs: '14px', sm: '15px', md: '16px' }
                  }}>
                    {message.text.split('**').map((part, index) => (
                      index % 2 === 1 ? (
                        <Typography 
                          key={index} 
                          component="span" 
                          sx={{ 
                            fontWeight: 600, 
                            color: 'white',
                            fontSize: 'inherit'
                          }}
                        >
                          {part}
                        </Typography>
                      ) : (
                        <Typography 
                          key={index} 
                          component="span" 
                          sx={{ 
                            lineHeight: 1.6, 
                            color: 'white',
                            fontSize: 'inherit'
                          }}
                        >
                          {part}
                        </Typography>
                      )
                    ))}
                  </Box>
                ) : (
                  // Regular Message - All white text
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      lineHeight: 1.6, 
                      fontSize: { xs: '14px', sm: '15px', md: '16px' },
                      fontWeight: message.sender === 'ai' ? 400 : 400,
                      color: 'white'
                    }}
                  >
                    {message.text}
                  </Typography>
                )}
                
                {/* 3-dot Menu for AI Messages */}
                {message.sender === 'ai' && (
                  <Box sx={{ 
                    position: 'absolute',
                    top: { xs: 6, sm: 8 },
                    right: { xs: 6, sm: 8 }
                  }}>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, message)}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 }
                      }}
                    >
                      <MoreVert fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  </Box>
                )}
                
                {/* Timestamp */}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute',
                    bottom: message.sender === 'ai' && message.isReport ? 
                      { xs: '-40px', sm: '-50px' } : 
                      { xs: '-20px', sm: '-25px' },
                    right: message.sender === 'user' ? { xs: '8px', sm: '12px' } : 'auto',
                    left: message.sender === 'ai' ? { xs: '8px', sm: '12px' } : 'auto',
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
        }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Type your response..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="medium"
            InputProps={{
              endAdornment: (
                <IconButton 
                  onClick={editingMessageId ? handleSaveEdit : handleSendMessage}
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

      {/* Menu for Edit/Copy Options */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            minWidth: 120,
          }
        }}
      >
        <MenuItem 
          onClick={() => selectedMessage && handleEditMessage(selectedMessage.id, selectedMessage.text)}
          sx={{ fontSize: '14px' }}
        >
          Edit
        </MenuItem>
        <MenuItem 
          onClick={() => selectedMessage && handleCopyText(selectedMessage.text)}
          sx={{ fontSize: '14px' }}
        >
          Copy Text
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default VoiceChat;