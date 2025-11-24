import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
          Privacy & Policy
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
            {/* Your Agreement Section */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                Your Agreement
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
                This Privacy Policy explains how our AI powered paramedic support application collects, uses, stores and protects the information of patients and authorised users. Our company is committed to maintaining the highest standards of privacy and security. The application is designed to support compliance with applicable healthcare privacy regulations including HPAA for the protection of Protected Health Information.
              </Typography>
            </Box>

            {/* Section 1: Information We Collect */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                1. Information We Collect
              </Typography>
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
                The application collects information that paramedics enter, capture or upload during patient assessment. This may include patient name, age, gender, medical history, vital signs, symptoms, medications, allergies, incident details, images or recordings taken during assessment and any additional clinical notes. The app may also leverage device sensors for location information when permitted by authorized personnel.
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
                We may automatically collect technical information including device identifiers, IP address, operating system version and usage logs for performance monitoring and security auditing.
              </Typography>
            </Box>

            {/* Section 2: How We Use Information */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                2. How We Use Information
              </Typography>
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
                All collected data is used to support emergency medical care, incident documentation and AI assisted report generation. Information helps paramedics make faster decisions, maintain accurate records and improve care delivery. Data may also be used to train and improve anonymized AI models when permitted by regulation and organizational policies.
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
                We may use technical information for troubleshooting, analytics, preventing unauthorised access and improving overall system performance.
              </Typography>
            </Box>

            {/* Section 3: HPAA Compliance */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                3. HPAA Compliance
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
                The application is developed with administrators, physical and technical safeguards that support compliance with HPAA. Protected health information is encrypted during transmission and not rest. Access to PHIs is restricted to authorized personnel through role based permissions, secure authentication and audit logging. We do not sell or misuse any patient information. All data handling follows the minimum necessary principle.
              </Typography>
            </Box>

            {/* Section 4: Data Sharing */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                4. Data Sharing
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
                Patient information is only shared with authorized healthcare providers, emergency departments, hospitals or medical directors when required to support patient care. We may share anonymised and de identified data for research, analytics or system improvement. We do not share identifiable information with third parties for marketing or commercial purposes. If required by law, regulation or court order, data may be disclosed to authorities while maintaining compliance with privacy obligations.
              </Typography>
            </Box>

            {/* Additional Sections */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                5. Data Retention
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
                We retain patient data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Data may be retained for legal, regulatory, or operational purposes in accordance with healthcare regulations and organizational policies.
              </Typography>
            </Box>

            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                6. User Rights
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
                Authorized users have the right to access, correct, or delete their personal information where feasible. Patients may have additional rights regarding their protected health information under applicable healthcare privacy laws. Requests regarding data access or modifications should be directed to the appropriate healthcare organization or privacy officer.
              </Typography>
            </Box>

            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                7. Security Measures
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
                We implement appropriate technical and organizational security measures to protect data against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, secure data transmission, regular security assessments, and staff training on data protection protocols.
              </Typography>
            </Box>

            <Box>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  fontWeight: 700, 
                  color: 'rgba(54, 128, 218, 1)',
                  mb: { xs: 2, md: 3 },
                  fontSize: { 
                    xs: '1.25rem', 
                    sm: '1.375rem', 
                    md: '1.5rem' 
                  }
                }}
              >
                8. Contact Information
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
                For questions about this Privacy Policy or our data practices, please contact our Privacy Officer at privacy@code3scribe.com or through the contact information provided within the application. We are committed to addressing any concerns regarding data privacy and security promptly and transparently.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;