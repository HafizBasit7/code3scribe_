import React from 'react';
import { Box, Typography } from '@mui/material';
import Logo from '../../../public/assets/images/logo.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Side - Images with Logo */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(135deg, #7077E4 0%, #8D93F6 100%)',
          position: 'relative',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: '100vh',
          minWidth: '600px',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            width: '150%',
            height: '150%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.5,
          }}
        />
        
        {/* Logo Container */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 260,
              height: 260,
              borderRadius: '40px',
              overflow: 'hidden',
              margin: '0 auto',
            }}
          >
            <img
              src={Logo}
              alt="Code3Scribe Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Typography
            variant="h3"
            sx={{
              mt: 4,
              color: '#fff',
              fontWeight: 500,
              letterSpacing: '1px',
            }}
          >
            Code3Scribe
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Form Content - FIXED */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Changed from center to flex-start
          p: 4,
          backgroundColor: '#fff',
          overflow: 'auto',
          minHeight: '100vh',
          pl: 8, // Add left padding to push content away from center
        }}
      >
        <Box sx={{ 
          width: '100%', 
          maxWidth: 700, // Increased from 500 to 700
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100%',
          py: 4
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;