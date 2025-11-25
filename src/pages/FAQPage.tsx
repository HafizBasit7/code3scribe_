import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const FAQPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const faqData = [
    {
      question: 'What is the difference between "Start a New Case" and "Report Questionnaire"?',
      answer: 'Start a New Case – Lets you record your narrative in your own words, with as much detail as needed. After you finish recording, the system generates a revised narrative—accurate, free from hallucinations, and ready for your review. You can then approve it and copy/paste it into your ePCR.',
      additionalInfo: 'Report Questionnaire – A guided, prompt-based questionnaire that asks targeted questions based on the reason for the call. Questions may be in a structured format—such as yes/no or short text—but we encourage you to provide as much detail as possible to help create a better, more accurate narrative.',
      tip: 'Use Start a New Case if you prefer free-form dictation. Use Report Questionnaire if you want a step-by-step guided approach.'
    },
    {
      question: 'What do I do after I record my Narrative?',
      answer: 'After recording your Narrative, the transcript will appear in the narrative input bar. Press Enter to submit it. The system will then automatically review, correct, and enhance your Narrative. Within seconds, you\'ll receive a revised version to review, make any final edits, and approve.',
      tip: 'Always verify accuracy before copying it into your ePCR.'
    },
    {
      question: 'Why are some patient identifiers—such as age, phone number, addresses, or hospital names—removed from my initial recording?',
      answer: 'Code3Scribe automatically removes patient-identifiable information to maintain HIPAA compliance. This includes details like age, phone number, address, and hospital names. Once you approve your narrative, you can add these details directly into your final ePCR.',
      tip: 'Always verify your final ePCR includes any required identifiers before submission.'
    },
    {
      question: 'Can I turn off the HIPAA filtering?',
      answer: 'No. HIPAA safeguards are always active to protect patient privacy.'
    },
    {
      question: 'How can I edit my Narrative?',
      answer: 'After recording and pressing Enter, your Narrative will appear below the recording transcription. Tap the three dots in the top-right corner, select Edit, make your changes, and then tap Done to save. Your updated Narrative will replace the old one.',
      tip: 'From the same menu, you can also copy or share your Narrative.'
    },
    {
      question: 'What if I want to redo my Narrative without recording?',
      answer: 'Once the system has created your Narrative, tap the three dots in the top-right corner and select Edit to make your changes. When finished, copy the updated text, paste it into the input bar where it says "Type a message", and press Enter. The system will generate a new Narrative for you within seconds.'
    },
    {
      question: 'How do I import my Narrative from Code3Scribe into my EMS software?',
      answer: 'After reviewing and approving your Narrative, tap the three dots and select Share. This will open the login page for your EMS software in your device\'s internet browser (Safari, Chrome, etc.). From there, log in with your own credentials, go to the Narrative or report section, and paste your Narrative.',
      additionalInfo: 'Note: Code3Scribe provides this workflow for user convenience only and is not affiliated with or endorsed by any third-party EMS software providers. All logins and data entry occur directly within your EMS software\'s secure environment, outside of Code3Scribe.',
      tip: 'If your EMS software is not available through the Share option, you can still add your Narrative. Simply open your EMS software in your device\'s browser or on the desktop version, log in with your own credentials, and navigate to the Narrative or report section. From there, copy and paste your Narrative into the appropriate field.'
    },
    {
      question: 'What is the function of Feedback?',
      answer: 'Feedback provides suggestions for improvement and clinical questions to consider. It\'s designed to help you reflect on what you did well and identify areas for growth, similar to having an FTO or preceptor guiding you after every call.'
    },
    {
      question: 'How long does my created narrative stay in History?',
      answer: 'Narratives remain in your History for 24 hours. During that time, you can open, review, and copy/paste them as needed. After 24 hours, they are automatically and permanently deleted.',
      tip: 'To delete a Narrative, tap See All next to History to view all created Narratives. Press and hold the Narrative you want to delete, then select Delete when the option appears.'
    },
    {
      question: 'Do I have to review my Narrative prior to submitting it?',
      answer: 'Yes. You should review every Narrative to ensure it is accurate before submission. This is also the time to add any necessary details that may have been removed by our HIPAA compliance tool, such as patient identifiers required in your final ePCR.',
      tip: 'Compare your Narrative against the actual call details to make sure all facts are correct and nothing important is missing before finalizing your PCR.'
    },
    {
      question: 'What happens to my Narratives if I cancel my subscription?',
      answer: 'All Narratives older than 24 hours are automatically deleted. You should export any needed Narratives before canceling.'
    },
    {
      question: 'Can multiple users share one account?',
      answer: 'No. Each account is individual to protect security and ensure accurate HIPAA compliance.'
    }
  ];

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
          Frequently Asked Questions
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Code3Scribe Support Guide
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
          <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            {faqData.map((faq, index) => (
              <Accordion 
                key={index}
                sx={{ 
                  mb: 2,
                  borderRadius: '8px !important',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    margin: '16px 0',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'rgba(54, 128, 218, 1)' }} />}
                  sx={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    minHeight: '60px',
                    '&.Mui-expanded': {
                      minHeight: '60px',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'rgba(54, 128, 218, 1)',
                      fontSize: { xs: '0.95rem', sm: '1rem' }
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails 
                  sx={{ 
                    p: 3,
                    backgroundColor: '#ffffff',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px'
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#374151', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.875rem', sm: '0.95rem' },
                      textAlign: 'left',
                      mb: faq.additionalInfo || faq.tip ? 2 : 0
                    }}
                  >
                    {faq.answer}
                  </Typography>

                  {faq.additionalInfo && (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#374151', 
                        lineHeight: 1.7, 
                        fontSize: { xs: '0.875rem', sm: '0.95rem' },
                        textAlign: 'left',
                        mb: 2,
                        mt: 2
                      }}
                    >
                      {faq.additionalInfo}
                    </Typography>
                  )}

                  {faq.tip && (
                    <Box 
                      sx={{ 
                        p: 2, 
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        border: '1px solid rgba(255, 193, 7, 0.2)',
                        borderRadius: 2,
                        mt: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <LightbulbIcon 
                          sx={{ 
                            color: 'rgba(255, 193, 7, 1)',
                            fontSize: '1.2rem',
                            mr: 1,
                            mt: 0.2
                          }} 
                        />
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'rgba(255, 159, 28, 1)',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' }
                          }}
                        >
                          Tip
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#374151', 
                          lineHeight: 1.6, 
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          textAlign: 'left'
                        }}
                      >
                        {faq.tip}
                      </Typography>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FAQPage;