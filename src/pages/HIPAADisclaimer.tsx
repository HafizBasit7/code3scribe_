import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';

const HIPAADisclaimer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      minWidth: 0,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, md: 3 }, flexShrink: 0 }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          sx={{ 
            fontWeight: 700, 
            color: 'rgba(54, 128, 218, 1)',
            mb: 2,
            fontSize: { 
              xs: '1.5rem', 
              sm: '1.75rem', 
              md: '2rem' 
            }
          }}
        >
          HIPAA Disclaimer
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666',
            fontStyle: 'italic',
            fontSize: { xs: '0.8rem', sm: '0.9rem' }
          }}
        >
          Last updated: August 11, 2025
        </Typography>
      </Box>

      {/* Scrollable Content Area */}
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
        <Card 
          sx={{ 
            borderRadius: { xs: 1.5, md: 2 },
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            mb: 3
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
            {/* Introduction */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#374151', 
                  lineHeight: 1.7, 
                  fontSize: { xs: '0.875rem', sm: '0.95rem' },
                  textAlign: { xs: 'left', sm: 'justify' },
                  mb: 2
                }}
              >
                Code 3 Scribe is intended for use by licensed EMS providers and other authorized healthcare professionals. We are committed to protecting patient privacy in compliance with the Health Insurance Portability and Accountability Act of 1996 (HIPAA).
              </Typography>
            </Box>

            {/* Real-Time PHI Removal */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(54, 128, 218, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                    mt: 0.5
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(54, 128, 218, 1)',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    1
                  </Typography>
                </Box>
                <Box>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'rgba(54, 128, 218, 1)',
                      mb: 1,
                      fontSize: { 
                        xs: '1.1rem', 
                        sm: '1.25rem', 
                        md: '1.375rem' 
                      }
                    }}
                  >
                    Real-Time PHI Removal
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#374151', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.875rem', sm: '0.95rem' },
                      textAlign: { xs: 'left', sm: 'justify' }
                    }}
                  >
                    All patient identifiers — including names, dates of birth, addresses, and other HIPAA-defined identifiers — are removed automatically during the voice-to-text transcription process. PHI is never stored in our systems.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* De-Identified Data Only */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(54, 128, 218, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                    mt: 0.5
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(54, 128, 218, 1)',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    2
                  </Typography>
                </Box>
                <Box>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'rgba(54, 128, 218, 1)',
                      mb: 1,
                      fontSize: { 
                        xs: '1.1rem', 
                        sm: '1.25rem', 
                        md: '1.375rem' 
                      }
                    }}
                  >
                    De-Identified Data Only
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#374151', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.875rem', sm: '0.95rem' },
                      textAlign: { xs: 'left', sm: 'justify' }
                    }}
                  >
                    Narrative generation uses only de-identified transcripts. Our integrated vendors, including OpenAI, receive only cleaned data that contains no PHI.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Secure Processing */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(54, 128, 218, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                    mt: 0.5
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(54, 128, 218, 1)',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    3
                  </Typography>
                </Box>
                <Box>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'rgba(54, 128, 218, 1)',
                      mb: 1,
                      fontSize: { 
                        xs: '1.1rem', 
                        sm: '1.25rem', 
                        md: '1.375rem' 
                      }
                    }}
                  >
                    Secure Processing
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#374151', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.875rem', sm: '0.95rem' },
                      textAlign: { xs: 'left', sm: 'justify' }
                    }}
                  >
                    Data is encrypted in transit, processed in HIPAA-eligible environments, and discarded immediately after use.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* No Diagnosis or Treatment */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(54, 128, 218, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                    mt: 0.5
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(54, 128, 218, 1)',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    4
                  </Typography>
                </Box>
                <Box>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'rgba(54, 128, 218, 1)',
                      mb: 1,
                      fontSize: { 
                        xs: '1.1rem', 
                        sm: '1.25rem', 
                        md: '1.375rem' 
                      }
                    }}
                  >
                    No Diagnosis or Treatment
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#374151', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.875rem', sm: '0.95rem' },
                      textAlign: { xs: 'left', sm: 'justify' }
                    }}
                  >
                    Code 3 Scribe is a documentation tool only. It does not provide medical advice, diagnosis, or treatment recommendations.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* User Responsibility */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(54, 128, 218, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                    mt: 0.5
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(54, 128, 218, 1)',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    5
                  </Typography>
                </Box>
                <Box>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'rgba(54, 128, 218, 1)',
                      mb: 1,
                      fontSize: { 
                        xs: '1.1rem', 
                        sm: '1.25rem', 
                        md: '1.375rem' 
                      }
                    }}
                  >
                    User Responsibility
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#374151', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.875rem', sm: '0.95rem' },
                      textAlign: { xs: 'left', sm: 'justify' }
                    }}
                  >
                    You are responsible for ensuring that your use of Code 3 Scribe complies with your organization's HIPAA policies and applicable laws.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Acknowledgment */}
            <Box sx={{ 
              p: 3, 
              background: 'rgba(54, 128, 218, 0.05)', 
              borderRadius: 2,
              border: '1px solid rgba(54, 128, 218, 0.1)'
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#374151', 
                  lineHeight: 1.7, 
                  fontSize: { xs: '0.875rem', sm: '0.95rem' },
                  textAlign: { xs: 'left', sm: 'justify' },
                  fontStyle: 'italic',
                  fontWeight: 500
                }}
              >
                By using Code 3 Scribe, you acknowledge and agree to these terms.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HIPAADisclaimer;