import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import mic from '../assets/icons/mic.png';
import question from '../assets/icons/question.png';
import arrow from '../assets/icons/arrow.png';

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const historyItems = [
    {
      id: 'ID-34567',
      name: 'John Doe',
      condition: 'Cardiac Arrest',
      location: 'Downtown Street',
      time: '1 day ago'
    },
    {
      id: 'ID-34566', 
      name: 'Emily Davis',
      condition: 'Car Accident', 
      location: 'Highway 21',
      time: '2 days ago'
    },
    {
      id: 'ID-34565',
      name: 'Liam Harris',
      condition: 'Fracture Injury',
      location: 'Sports Complex', 
      time: '3 days ago'
    },
    {
      id: 'ID-34564',
      name: 'Sarah Wilson',
      condition: 'Stroke',
      location: 'Medical Center',
      time: '4 days ago'
    },
    {
      id: 'ID-34563',
      name: 'Michael Brown',
      condition: 'Heart Attack',
      location: 'City Hospital',
      time: '5 days ago'
    }
  ];

  const actionButtonWidth = isMobile ? '100%' : isTablet ? '100%' : '500px';
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
            pb: { xs: 1, md: 1.5 } 
          } 
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%',
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Box sx={{ 
              flex: 1,
              order: { xs: 2, sm: 1 },
              mt: { xs: 2, sm: 0 }
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
              order: { xs: 1, sm: 2 }
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
              sx={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                fontSize: { xs: '16px', sm: '18px' },
                fontWeight: 600,
                borderRadius: { xs: 2, md: 3 },
                textTransform: 'none',
                color: 'white',
                position: 'relative',
                justifyContent: 'flex-start',
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
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.5rem', 
                    md: '1.75rem' 
                  }, 
                  mt: { xs: 8, md: 10 },
                  textAlign: 'left',
                  pl: { xs: 1, md: 0 }
                }}
              >
                Start a New Case
              </Typography>

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
              sx={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                fontSize: { xs: '16px', sm: '18px' },
                fontWeight: 600,
                borderRadius: { xs: 2, md: 3 },
                textTransform: 'none',
                color: 'white',
                position: 'relative',
                justifyContent: 'flex-start',
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
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.5rem', 
                    md: '1.75rem' 
                  }, 
                  mt: { xs: 8, md: 10 },
                  textAlign: 'left',
                  pl: { xs: 1, md: 0 }
                }}
              >
                Report Questionnaire
              </Typography>

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
        {/* History Header */}
        <Box sx={{ 
          p: { xs: 1.5, md: 2 }, 
          pb: { xs: 1.5, md: 2 }, 
          borderBottom: '1px solid #f1f5f9',
          flexShrink: 0 
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
            {historyItems.map((item, index) => (
              <Card 
                key={item.id} 
                sx={{ 
                  mb: { xs: 1.5, md: 2 }, 
                  borderRadius: { xs: 1.5, md: 2 },
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  '&:hover': {
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  },
                  width: '100%',
                  position: 'relative',
                  overflow: 'visible',
                  mt: 1,
                }}
              >
                {/* Blue ID Badge */}
                <Box sx={{
                  position: 'absolute',
                  top: -10,
                  left: { xs: 8, md: 12 },
                  background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
                  color: 'white',
                  px: { xs: 2, md: 3.5 },
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: { xs: '11px', md: '12px' },
                  fontWeight: 600,
                  boxShadow: '0 2px 4px rgba(14, 97, 192, 0.3)',
                  zIndex: 1,
                }}>
                  {item.id}
                </Box>

                <CardContent sx={{ 
                  p: { xs: 1.5, md: 2 }, 
                  '&:last-child': { 
                    pb: { xs: 1.5, md: 1 } 
                  }, 
                  pt: { xs: 2, md: 2 } 
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    width: '100%',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 0 }
                  }}>
                    <Box sx={{ 
                      flex: 1, 
                      mt: { xs: 0, sm: 0.5 } 
                    }}>
                      <Typography 
                        variant="body2" 
                        color="#64748b"
                        sx={{ 
                          fontSize: { xs: '12px', md: '13px' }, 
                          lineHeight: 1.4 
                        }}
                      >
                        {item.name} - {item.condition} | {item.location}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.time}
                      size="small"
                      sx={{
                        color: 'rgba(14, 97, 192, 1)',
                        fontWeight: 500,
                        fontSize: { xs: '12px', md: '13px' },
                        minWidth: { xs: '60px', md: '70px' },
                        height: { xs: '24px', md: '28px' },
                        mt: { xs: 0.5, sm: 0 }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;