import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';

const TermsAndConditions: React.FC = () => {
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
          Terms & Conditions
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
                Please read these terms and conditions carefully before using Our Service.
              </Typography>
            </Box>

            {/* Interpretation and Definitions */}
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
                Interpretation and Definitions
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
                <strong>Interpretation</strong><br />
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
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
                <strong>Definitions</strong><br />
                For the purposes of these Terms and Conditions:
              </Typography>

              <Box component="ul" sx={{ pl: 2, color: '#374151', fontSize: { xs: '0.875rem', sm: '0.95rem' }, mb: 2 }}>
                <li><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named Code 3 Scribe</li>
                <li><strong>Application Store</strong> means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.</li>
                <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Code 3 Scribe LLC, 2021 Guadalupe St, Suite 260, Austin, TX 78705.</li>
                <li><strong>Country</strong> refers to: Texas, United States</li>
                <li><strong>Service</strong> refers to the Application.</li>
                <li><strong>Terms and Conditions</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
              </Box>
            </Box>

            {/* Acknowledgment */}
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
                Acknowledgment
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
                These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
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
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
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
                By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
              </Typography>
            </Box>

            {/* HIPAA, Vendor, and Compliance Disclosures */}
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
                HIPAA, Vendor, and Compliance Disclosures
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
                <strong>HIPAA-Related Notice</strong><br />
                This section supplements our Privacy Policy. While Code 3 Scribe is designed for EMS and healthcare professionals and adheres to HIPAA principles, Code 3 Scribe LLC does not act as a HIPAA-covered entity or business associate. Instead, the Service is structured so that no Protected Health Information ("PHI") is stored, retained, or transmitted in its identifiable form.
              </Typography>

              <Box component="ul" sx={{ pl: 2, color: '#374151', fontSize: { xs: '0.875rem', sm: '0.95rem' }, mb: 2 }}>
                <li><strong>PHI Removal:</strong> All HIPAA-defined identifiers—including patient names, dates of birth, addresses, contact details, and other personal identifiers—are automatically stripped at the voice-to-text transcription stage before any further processing.</li>
                <li><strong>De-Identified Processing:</strong> Narrative generation uses only de-identified transcripts. This ensures that data sent to third-party vendors contains no PHI.</li>
                <li><strong>Vendors:</strong> The Company utilizes secure vendors including Amazon Web Services (AWS) for hosting and OpenAI for AI narrative generation, which processes only de-identified text stripped of PHI before submission.</li>
              </Box>
            </Box>

            {/* Medical Disclaimer */}
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
                Medical Disclaimer
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
                Code 3 Scribe is intended solely for use by licensed EMS professionals and authorized healthcare personnel for the purpose of creating patient care documentation. The Service does not provide medical advice, diagnosis, or treatment and must not be relied upon as a substitute for professional medical judgment. All clinical decisions are the sole responsibility of the user and their supervising agency.
              </Typography>
            </Box>

            {/* No Emergency Services */}
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
                No Emergency Services
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
                The Service does not connect you to emergency dispatch, hospitals, or any medical facility. It cannot be used to summon emergency help. In case of an emergency, you must call 911 or your local emergency number.
              </Typography>
            </Box>

            {/* User Responsibility */}
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
                User Responsibility
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
                You are solely responsible for:
              </Typography>

              <Box component="ul" sx={{ pl: 2, color: '#374151', fontSize: { xs: '0.875rem', sm: '0.95rem' }, mb: 2 }}>
                <li>Ensuring that all data entered into the Service complies with HIPAA, state, and local privacy laws</li>
                <li>Using the Service only for lawful purposes and in accordance with your employer's compliance policies</li>
                <li>Verifying that all generated narratives are accurate and appropriate for patient care documentation</li>
                <li>Verifying all outputs for accuracy before including them in official patient care documentation</li>
                <li>Avoiding entry of identifiable PHI in any free text fields where automated PHI removal tools may not apply</li>
              </Box>
            </Box>

            {/* Age Restrictions */}
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
                Age Restrictions
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
                The Code 3 Scribe application is intended for use only by individuals 18 years of age or older. By accessing or using the Service, you represent and warrant that you are at least 18 years old. The Service is not directed to, and may not be used by, anyone under the age of 18.
              </Typography>
            </Box>

            {/* Accessibility (ADA) Support */}
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
                Accessibility (ADA) Support
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
                Code 3 Scribe is committed to ensuring that our Service is accessible to all users, including individuals with disabilities, in accordance with the Americans with Disabilities Act (ADA) and other applicable accessibility laws.
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
                If you experience any difficulty accessing or using the Service due to a disability, you may contact us at team@code3scribe.ai.
              </Typography>
            </Box>

            {/* Subscriptions */}
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
                Subscriptions
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
                <strong>Subscription Period:</strong> The Service or some parts of the Service are available only with a paid Subscription. You will be billed in advance on a recurring and periodic basis, depending on the type of Subscription plan you select.
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
                <strong>Subscription Cancellations:</strong> You may cancel Your Subscription renewal either through Your Account settings page or by contacting the Company. You will not receive a refund for the fees You already paid for Your current Subscription period.
              </Typography>
            </Box>

            {/* Intellectual Property */}
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
                Intellectual Property
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
                The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.
              </Typography>
            </Box>

            {/* Limitation of Liability */}
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
                Limitation of Liability
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
                Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
              </Typography>
            </Box>

            {/* "AS IS" Disclaimer */}
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
                "AS IS" and "AS AVAILABLE" Disclaimer
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
                The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company expressly disclaims all warranties, whether express, implied, statutory or otherwise.
              </Typography>
            </Box>

            {/* Governing Law & Jurisdiction */}
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
                Governing Law & Jurisdiction
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
                These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any dispute, claim, or controversy arising out of or relating to these Terms or the use of the Service shall be brought exclusively in the state or federal courts located in Travis County, Texas.
              </Typography>
            </Box>

            {/* Changes to These Terms and Conditions */}
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
                Changes to These Terms and Conditions
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
                We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.
              </Typography>
            </Box>

            {/* Contact Us */}
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
                Contact Us
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
                If you have any questions about these Terms and Conditions, You can contact us:
              </Typography>

              <Box component="ul" sx={{ pl: 2, color: '#374151', fontSize: { xs: '0.875rem', sm: '0.95rem' } }}>
                <li>By email: team@code3scribe.ai</li>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TermsAndConditions;