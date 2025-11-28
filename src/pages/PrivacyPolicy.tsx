import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { privacyPolicyContent } from '../data/privacyPolicyContent';

// Define proper types for ReactMarkdown components
interface MarkdownComponentProps {
  node?: any;
  children?: React.ReactNode;
}

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Custom components for ReactMarkdown to match your design
  const MarkdownComponents = {
    h1: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        sx={{ 
          fontWeight: 700, 
          color: 'rgba(54, 128, 218, 1)',
          mb: 3,
          mt: 4,
          fontSize: { 
            xs: '1.5rem', 
            sm: '1.75rem', 
            md: '2rem' 
          }
        }}
        {...props}
      />
    ),
    h2: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        sx={{ 
          fontWeight: 700, 
          color: 'rgba(54, 128, 218, 1)',
          mb: 2,
          mt: 3,
          fontSize: { 
            xs: '1.25rem', 
            sm: '1.375rem', 
            md: '1.5rem' 
          }
        }}
        {...props}
      />
    ),
    h3: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          color: 'rgba(54, 128, 218, 0.9)',
          mb: 1,
          mt: 2,
          fontSize: { 
            xs: '1.1rem', 
            sm: '1.2rem', 
            md: '1.3rem' 
          }
        }}
        {...props}
      />
    ),
    p: ({ node, ...props }: MarkdownComponentProps) => (
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#374151', 
          lineHeight: 1.7, 
          fontSize: { xs: '0.875rem', sm: '0.95rem' },
          textAlign: { xs: 'left', sm: 'justify' },
          mb: 2
        }}
        {...props}
      />
    ),
    ul: ({ node, ...props }: MarkdownComponentProps) => (
      <Box 
        component="ul" 
        sx={{ 
          pl: 2, 
          color: '#374151', 
          fontSize: { xs: '0.875rem', sm: '0.95rem' },
          mb: 2,
          '& li': {
            mb: 1,
            lineHeight: 1.6
          }
        }}
        {...props}
      />
    ),
    ol: ({ node, ...props }: MarkdownComponentProps) => (
      <Box 
        component="ol" 
        sx={{ 
          pl: 2, 
          color: '#374151', 
          fontSize: { xs: '0.875rem', sm: '0.95rem' },
          mb: 2,
          '& li': {
            mb: 1,
            lineHeight: 1.6
          }
        }}
        {...props}
      />
    ),
    li: ({ node, ...props }: MarkdownComponentProps) => (
      <li style={{ lineHeight: 1.6 }} {...props} />
    ),
    strong: ({ node, ...props }: MarkdownComponentProps) => (
      <strong style={{ color: '#1f2937' }} {...props} />
    ),
    em: ({ node, ...props }: MarkdownComponentProps) => (
      <em style={{ color: '#6b7280', fontStyle: 'italic' }} {...props} />
    )
  };

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
      {/* <Box sx={{ mb: { xs: 2, md: 3 }, flexShrink: 0 }}>
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
          Privacy Policy
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
      </Box> */}

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
            <ReactMarkdown components={MarkdownComponents}>
              {privacyPolicyContent}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;