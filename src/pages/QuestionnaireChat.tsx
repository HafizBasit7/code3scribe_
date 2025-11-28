// pages/QuestionnaireChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { Send, Mic, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import back from '../assets/icons/back.png';
import { generateQuestionnaire, generateReport } from '../services/aiApi';
import { selectUserId } from '../store/selectors/authSelectors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface ConversationState {
  medicalReason: string;
  currentQuestionIndex: number;
  aiMessages: string[];
  isComplete: boolean;
  conversationHistory: string[];
}

const QuestionnaireChat: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "What was the reason for the call?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    medicalReason: '',
    currentQuestionIndex: 0,
    aiMessages: [],
    isComplete: false,
    conversationHistory: []
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation when component mounts
  useEffect(() => {
    // The first AI message is already set in initial state
  }, []);

  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;

    const userMessageText = inputText.trim();
    setInputText('');

    // Add user message to chat
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // If this is the first message (medical reason)
      if (conversationState.medicalReason === '') {
        await handleFirstMessage(userMessageText);
      } else {
        await handleFollowUpMessage(userMessageText);
      }
    } catch (error: any) {
      console.error('Error in AI conversation:', error);
      setSnackbar({
        open: true,
        message: 'Failed to get AI response. Please try again.',
        severity: 'error'
      });
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, but it seems like there might be a typo or error in your request. Could you please provide a clear dispatch medical reason or scenario so I can assist you effectively?.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

// In QuestionnaireChat.tsx - Update the handleFirstMessage function
const handleFirstMessage = async (medicalReason: string) => {
  if (!userId) {
    throw new Error('User ID not available. Please ensure you are logged in.');
  }

  try {
    // Store medical reason
    setConversationState(prev => ({
      ...prev,
      medicalReason,
      conversationHistory: [`Medical Reason: ${medicalReason}`]
    }));

    // Call AI API to generate questionnaire
    const response = await generateQuestionnaire({
      userId,
      medicalReason
    });

    console.log('🟢 AI Response received:', {
      success: response.success,
      questionCount: response.questions?.length,
      hasQuestions: !!response.questions
    });

    if (response.success && response.questions && response.questions.length > 0) {
      // Store AI questions for the conversation flow
      setConversationState(prev => ({
        ...prev,
        aiMessages: response.questions! // Use questions instead of messages
      }));

      // Add first AI question to chat
      const firstAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.questions[0],
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, firstAiMessage]);
    } else {
      // Handle case where API returns success but no questions
      console.error('🔴 API returned success but no questions:', response);
      throw new Error(response.message || 'No questions generated. Please try again with a different medical reason.');
    }
  } catch (error: any) {
    console.error('🔴 Error in handleFirstMessage:', error);
    
    // Reset conversation state on error
    setConversationState(prev => ({
      ...prev,
      medicalReason: '',
      conversationHistory: []
    }));
    
    throw error; // Re-throw to be handled by the caller
  }
};

  const handleFollowUpMessage = async (userResponse: string) => {
    const { medicalReason, aiMessages, currentQuestionIndex, conversationHistory } = conversationState;
    
    // Update conversation history
    const updatedHistory = [
      ...conversationHistory,
      `Q: ${aiMessages[currentQuestionIndex]}`,
      `A: ${userResponse}`
    ];

    setConversationState(prev => ({
      ...prev,
      conversationHistory: updatedHistory,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));

    const nextQuestionIndex = currentQuestionIndex + 1;

    // Check if we have more questions
    if (nextQuestionIndex < aiMessages.length) {
      // Add next AI question
      const nextAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiMessages[nextQuestionIndex],
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, nextAiMessage]);
    } else {
      // All questions completed - generate report
      await generateFinalReport(medicalReason, updatedHistory.join('\n'));
    }
  };

  const generateFinalReport = async (medicalReason: string, conversationText: string) => {
    if (!userId) {
      throw new Error('User ID not available');
    }

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Generating your medical report...",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, loadingMessage]);

    // Call report generation API
    const response = await generateReport({
      userId,
      medicalReason,
      questionAnswerString: conversationText
    });

    if (response.success && response.report) {
      // Add final report to chat
      const reportMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: response.report,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reportMessage]);

      // Mark conversation as complete
      setConversationState(prev => ({
        ...prev,
        isComplete: true
      }));

      setSnackbar({
        open: true,
        message: 'Medical report generated successfully!',
        severity: 'success'
      });
    } else {
      throw new Error('Failed to generate report');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const canSendMessage = inputText.trim() !== '' && !isLoading && !conversationState.isComplete;

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

      {/* Status Indicator */}
      {/* {conversationState.medicalReason && (
        <Box sx={{ 
          px: { xs: 2, sm: 3 }, 
          py: 1, 
          bgcolor: 'rgba(76, 175, 80, 0.1)',
          borderBottom: '1px solid rgba(76, 175, 80, 0.2)'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#2e7d32',
              fontWeight: 500,
              fontSize: { xs: '12px', sm: '14px' }
            }}
          >
            Medical Reason: {conversationState.medicalReason} • 
            Question {Math.min(conversationState.currentQuestionIndex + 1, conversationState.aiMessages.length)} of {conversationState.aiMessages.length || 1}
            {conversationState.isComplete && ' • Report Generated'}
          </Typography>
        </Box>
      )} */}

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
                    fontWeight: message.sender === 'ai' ? 400 : 400,
                    whiteSpace: 'pre-wrap'
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
          
          {/* Loading Indicator */}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Box
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: { xs: '30px', sm: '40px' },
                  background: '#ffffff',
                  border: '1px solid #e0e0e0',
                }}
              >
                <CircularProgress size={20} sx={{ color: '#2196F3' }} />
              </Box>
            </Box>
          )}
          
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        {!conversationState.isComplete && (
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            alignItems: 'flex-end',
            margin: '0 auto',
            p: { xs: 2, sm: 3 },
            width: '100%',
            maxWidth: { xs: '100%', sm: '800px', md: '1000px', lg: '1200px' },
            pb: { xs: 2, sm: 3 }
          }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder={conversationState.medicalReason ? "Type your response..." : "Describe the medical reason for the call..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="medium"
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <IconButton 
                    onClick={handleSendMessage}
                    disabled={!canSendMessage}
                    sx={{
                      background: canSendMessage 
                        ? 'linear-gradient(135deg, rgba(193, 160, 249, 1) 0%, rgba(56, 135, 225, 1) 100%)'
                        : '#bdbdbd',
                      color: 'white',
                      width: { xs: '36px', sm: '40px' },
                      height: { xs: '36px', sm: '40px' },
                      borderRadius: '20px',
                      mr: 1,
                      '&:hover': canSendMessage ? {
                        background: 'linear-gradient(135deg, rgba(173, 140, 229, 1) 0%, rgba(46, 115, 205, 1) 100%)',
                      } : {},
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <Send fontSize={isMobile ? "small" : "medium"} />
                    )}
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
        )}

        {/* Completion Message */}
        {conversationState.isComplete && (
          <Box sx={{ 
            p: 3, 
            textAlign: 'center',
            bgcolor: 'rgba(76, 175, 80, 0.1)',
            borderTop: '1px solid rgba(76, 175, 80, 0.2)'
          }}>
            {/* <Assignment sx={{ fontSize: 48, color: '#2e7d32', mb: 2 }} /> */}
            {/* <Typography variant="h6" sx={{ color: '#2e7d32', mb: 1 }}>
              Medical Report Complete
            </Typography>
            <Typography variant="body2" sx={{ color: '#2e7d32', mb: 2 }}>
              Your medical questionnaire has been completed and the report has been generated.
            </Typography> */}
            <Button 
              variant="contained"
              onClick={() => {
                setMessages([{
                  id: '1',
                  text: "What was the reason for the call?",
                  sender: 'ai',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
                setConversationState({
                  medicalReason: '',
                  currentQuestionIndex: 0,
                  aiMessages: [],
                  isComplete: false,
                  conversationHistory: []
                });
              }}
              sx={{
                background: 'linear-gradient(135deg, rgba(193, 160, 249, 1) 0%, rgba(56, 135, 225, 1) 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(173, 140, 229, 1) 0%, rgba(46, 115, 205, 1) 100%)',
                }
              }}
            >
              Start New Questionnaire
            </Button>
          </Box>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuestionnaireChat;