// pages/Home.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from '@mui/material';
import mic from '../assets/icons/mic.png';
import question from '../assets/icons/question.png';
import arrow from '../assets/icons/arrow.png';
import { Grid as MuiGrid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { useSelector } from 'react-redux';
import { selectUserId, selectToken } from '../store/selectors/authSelectors';
import { getUserResponseHistory, UserResponseHistory } from '../services/aiApi';
import HistoryCard from '../components/HistoryCard/HistoryCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const Grid = MuiGrid as React.ComponentType<any>;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Redux selectors
  const userId = useSelector(selectUserId);
  const authToken = useSelector(selectToken);

  // State for history data
  const [historyItems, setHistoryItems] = useState<UserResponseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user response history
  useEffect(() => {
    const fetchUserHistory = async () => {
      if (!userId || !authToken) {
        console.log('🟡 No user ID or token available for fetching history');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('🟡 Fetching history for user:', userId);
        const response = await getUserResponseHistory(userId, authToken);

        if (response.success && response.data) {
          console.log('🟢 History data received:', response.data.length, 'items');
          setHistoryItems(response.data);
        } else {
          setError(response.message || 'Failed to load history');
          console.warn('🟡 History fetch warning:', response.message);
        }
      } catch (err: any) {
        console.error('🔴 Error fetching history:', err);
        setError('Failed to load history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [userId, authToken]);

  // Get only first 3 history items for display
  const displayedHistoryItems = historyItems.slice(0, 3);

  const actionButtonHeight = isMobile ? '120px' : '140px';
  const robotImageSize = isMobile ? 100 : isTablet ? 120 : 150;

  return (
    <Box sx={{
      p: { xs: 1, sm: 2, md: 3 },
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      minWidth: 0,
      overflow: 'hidden',
    }}>
      {/* Welcome Card with Robot Image */}
      <Card
        sx={{
          mb: { xs: 1, md: 2 },
          borderRadius: { xs: 2, md: 3 },
          background: 'white',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          width: '100%',
        }}
      >
        <CardContent sx={{
          p: { xs: 1, md: 1.5 },
          '&:last-child': {
            pb: { xs: 0.5, md: 1.5 }
          }
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            flexDirection: { xs: 'row', sm: 'row' },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Box sx={{
              flex: 1,
              order: { xs: 2, sm: 1 },
              mt: { xs: 1, sm: 0 }
            }}>
              <Typography
                variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
                sx={{
                  fontWeight: 600,
                  color: 'rgba(14, 97, 192, 1)',
                  mb: 0,
                  fontSize: {
                    xs: '1.75rem',
                    sm: '2.125rem',
                    md: '2.5rem',
                    lg: '3rem'
                  },
                  ml: { xs: 0, sm: 3 },
                  lineHeight: { xs: 1.3, md: 1.2 }
                }}
              >
                How May I Help You<br />
                Today?
              </Typography>
            </Box>
            <Box sx={{
              flexShrink: 0,
              ml: { xs: 0, sm: 3 },
              mr: { xs: 0, sm: 3 },
              order: { xs: 2, sm: 2 }
            }}>
              <img
                src="/assets/images/robo.png"
                alt="Assistant Robot"
                style={{
                  width: robotImageSize,
                  height: robotImageSize - 10,
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Buttons Section with Icons */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          mb: { xs: 1, md: 2 },
          flexShrink: 0,
          width: '100%',
        }}
      >
        {/* Start a New Case Button */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: { xs: 2, md: 3 },
              background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
              boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              minWidth: '100%',
              height: actionButtonHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
              }
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(ROUTES.VOICE_RECORDING)}
              sx={{
                width: '100%',
                minWidth: '100%',
                height: '100%',
                minHeight: '100%',
                background: 'transparent',
                fontSize: { xs: '16px', sm: '18px' },
                fontWeight: 600,
                borderRadius: { xs: 2, md: 3 },
                textTransform: 'none',
                color: 'white',
                position: 'relative',
                justifyContent: 'flex-start',
                padding: 8,
                margin: 0,
                '&:hover': {
                  background: 'transparent',
                }
              }}
            >
              {/* Mic Icon */}
              <Box sx={{
                position: 'absolute',
                top: { xs: 15, md: 20 },
                left: { xs: 15, md: 20 }
              }}>
                <img
                  src={mic}
                  alt="Microphone"
                  style={{
                    width: isMobile ? 20 : 24,
                    height: isMobile ? 20 : 24,
                    objectFit: 'contain',
                  }}
                />
              </Box>

              {/* Button Text */}
              <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                paddingTop: { xs: 8, md: 10 }
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                      md: '1.75rem'
                    },
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  Start a New Case
                </Typography>
              </Box>

              {/* Arrow Icon */}
              <Box sx={{
                position: 'absolute',
                top: { xs: 15, md: 20 },
                right: { xs: 15, md: 20 }
              }}>
                <img
                  src={arrow}
                  alt="Arrow"
                  style={{
                    width: isMobile ? 16 : 20,
                    height: isMobile ? 16 : 20,
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Button>
          </Card>
        </Grid>

        {/* Report Questionnaire Button */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: { xs: 2, md: 3 },
              background: 'linear-gradient(135deg, rgba(193,160,249,1) 0%, rgba(56,135,225,1) 100%)',
              boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              minWidth: '100%',
              height: actionButtonHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
              }
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(ROUTES.QUESTIONNAIRE_CHAT)}
              sx={{
                width: '100%',
                minWidth: '100%',
                height: '100%',
                minHeight: '100%',
                background: 'transparent',
                fontSize: { xs: '16px', sm: '18px' },
                fontWeight: 600,
                borderRadius: { xs: 2, md: 3 },
                textTransform: 'none',
                color: 'white',
                position: 'relative',
                justifyContent: 'flex-start',
                padding: 5.5,
                margin: 0,
                '&:hover': {
                  background: 'transparent',
                }
              }}
            >
              {/* Question Icon */}
              <Box sx={{
                position: 'absolute',
                top: { xs: 15, md: 20 },
                left: { xs: 15, md: 20 }
              }}>
                <img
                  src={question}
                  alt="Question"
                  style={{
                    width: isMobile ? 20 : 24,
                    height: isMobile ? 20 : 24,
                    objectFit: 'contain',
                  }}
                />
              </Box>

              {/* Button Text */}
              <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                paddingTop: { xs: 8, md: 10 }
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                      md: '1.75rem'
                    },
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  Report Questionnaire
                </Typography>
              </Box>

              {/* Arrow Icon */}
              <Box sx={{
                position: 'absolute',
                top: { xs: 15, md: 20 },
                right: { xs: 15, md: 20 }
              }}>
                <img
                  src={arrow}
                  alt="Arrow"
                  style={{
                    width: isMobile ? 16 : 20,
                    height: isMobile ? 16 : 20,
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* History Section */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
        width: '100%',
        background: 'white',
        borderRadius: { xs: 2, md: 3 },
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        {/* History Header with See All Button */}
        <Box sx={{
          p: { xs: 1.5, md: 2 },
          pb: { xs: 1.5, md: 2 },
          borderBottom: '1px solid #f1f5f9',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              fontWeight: 600,
              color: 'rgba(14, 97, 192, 1)',
              fontSize: {
                xs: '1.25rem',
                sm: '1.5rem',
                md: '1.75rem'
              },
            }}
          >
            History
          </Typography>
          
          {/* See All Button */}
         
            <Button
              variant="text"
              size="small"
              onClick={() => navigate(ROUTES.HISTORY)}
              sx={{
                color: 'rgba(14, 97, 192, 1)',
                fontWeight: 500,
                fontSize: { xs: '14px', md: '16px' },
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(14, 97, 192, 0.04)',
                }
              }}
            >
              See All
            </Button>
      
        </Box>

        {/* History Items Container */}
        <Box sx={{
          flex: 1,
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, md: 3 },
          pt: 0,
        }}>
          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={40} sx={{ color: 'rgba(14, 97, 192, 1)' }} />
            </Box>
          )}

          {/* Error State */}
          {error && !loading && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Empty State */}
          {!loading && !error && displayedHistoryItems.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No history found. Start a new case to see your reports here.
              </Typography>
            </Box>
          )}

          {/* History List - Only show 3 items */}
          <Box sx={{
            flex: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f5f9',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#cbd5e1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#94a3b8',
            }
          }}>
            {!loading && displayedHistoryItems.map((item, index) => (
              <HistoryCard
                key={item.id}
                item={item}
                showModal={true} 
                index={index}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;