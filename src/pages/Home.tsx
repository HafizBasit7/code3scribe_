import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import mic from '../assets/icons/mic.png';
import question from '../assets/icons/question.png';
import arrow from '../assets/icons/arrow.png';

const Home: React.FC = () => {
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

  return (
    <Box sx={{ 
      p: 2, 
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
          mb: 1, 
          borderRadius: 3,
          background: 'white',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          width: '100%',
        }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'rgba(14, 97, 192, 1)', 
                  mb: 0,
                  fontSize: '40px',
                  ml: 3,
                }}
              >
                How May I Help You<br />
                Today?
              </Typography>
            </Box>
            <Box sx={{ flexShrink: 0, ml: 3, mr: 3 }}>
              <img
                src="/assets/images/robo.png"
                alt="Assistant Robot"
                style={{
                  width: 150,
                  height: 140,
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Buttons Section with Icons */}
      <Box sx={{ 
        mb: 1, 
        display: 'flex', 
        gap: 3, 
        flexWrap: 'wrap',
        flexShrink: 0,
        width: '100%',
      }}>
        {/* Start a New Case Button */}
        <Card
          sx={{
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
            boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            width: '500px',
            height: '140px',
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
              fontSize: '18px',
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              color: 'white',
              position: 'relative',
              justifyContent: 'flex-start',
              '&:hover': {
                background: 'transparent',
              }
            }}
          >
            {/* Mic Icon - Top Left */}
            <Box sx={{ 
              position: 'absolute', 
              top: 20, 
              left: 20 
            }}>
              <img
                src={mic}
                alt="Microphone"
                style={{
                  width: 24,
                  height: 24,
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Button Text */}
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '28px', mt: 10, }}>
              Start a New Case
            </Typography>

            {/* Arrow Icon - Top Right */}
            <Box sx={{ 
              position: 'absolute', 
              top: 20, 
              right: 20 
            }}>
              <img
                src={arrow}
                alt="Arrow"
                style={{
                  width: 20,
                  height: 20,
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Button>
        </Card>

        {/* Report Questionnaire Button */}
        <Card
          sx={{
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(193,160,249,1) 0%, rgba(56,135,225,1) 100%)',
            boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            width: '500px',
            height: '140px',
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
              fontSize: '18px',
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              color: 'white',
              position: 'relative',
              justifyContent: 'flex-start',
              '&:hover': {
                background: 'transparent',
              }
            }}
          >
            {/* Question Icon - Top Left */}
            <Box sx={{ 
              position: 'absolute', 
              top: 20, 
              left: 20 
            }}>
              <img
                src={question}
                alt="Question"
                style={{
                  width: 24,
                  height: 24,
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Button Text */}
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '28px', mt: 10 }}>
              Report Questionnaire
            </Typography>

            {/* Arrow Icon - Top Right */}
            <Box sx={{ 
              position: 'absolute', 
              top: 20, 
              right: 20 
            }}>
              <img
                src={arrow}
                alt="Arrow"
                style={{
                  width: 20,
                  height: 20,
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Button>
        </Card>
      </Box>

      {/* History Section */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: 0,
        overflow: 'hidden',
        width: '100%',
        background: 'white',
        borderRadius: 3,
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        {/* History Header */}
        <Box sx={{ 
          p: 1, 
          pb: 2, 
          borderBottom: '1px solid #f1f5f9',
          flexShrink: 0 
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600, 
              color: 'rgba(14, 97, 192, 1)', 
              fontSize: '24px',
            }}
          >
            History
          </Typography>
        </Box>
        
        {/* History Items Container - Fits Available Space */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
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
                  mb: 2, 
                  borderRadius: 2,
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
                {/* Blue ID Badge - Positioned Above and Inside */}
                <Box sx={{
                  position: 'absolute',
                  top: -10,
                  left: 12,
                  background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
                  color: 'white',
                  px: 3.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '12px',
                  fontWeight: 600,
                  boxShadow: '0 2px 4px rgba(14, 97, 192, 0.3)',
                  zIndex: 1,
                }}>
                  {item.id}
                </Box>

                <CardContent sx={{ p: 2, '&:last-child': { pb: 1 }, pt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                    <Box sx={{ flex: 1, mt: 0.5 }}>
                      <Typography 
                        variant="body2" 
                        color="#64748b"
                        sx={{ fontSize: '13px', lineHeight: 1.4 }}
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
                        fontSize: '17px',
                        minWidth: '70px',
                        height: '20px',
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