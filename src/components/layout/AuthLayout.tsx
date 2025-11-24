import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Logo from '../../../public/assets/images/logo.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      {/* Left Side - Images with Logo - Hidden on mobile */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(135deg, #7077E4 0%, #8D93F6 100%)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            minHeight: { xs: '200px', md: '100vh' },
            minWidth: { md: '400px', lg: '500px' },
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
              px: 2,
            }}
          >
            <Box
              sx={{
                width: { md: 200, lg: 260 },
                height: { md: 200, lg: 260 },
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
              variant={isTablet ? "h4" : "h3"}
              sx={{
                mt: 3,
                color: '#fff',
                fontWeight: 500,
                letterSpacing: '1px',
              }}
            >
              Code3Scribe
            </Typography>
          </Box>
        </Box>
      )}

      {/* Right Side - Form Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: { xs: 'flex-start', md: 'center' },
          p: { xs: 3, sm: 4, md: 6 },
          backgroundColor: '#fff',
          overflow: 'auto',
          minHeight: { xs: 'calc(100vh - 200px)', md: '100vh' },
          width: '100%',
        }}
      >
        <Box sx={{ 
          width: '100%', 
          maxWidth: { xs: '100%', sm: 500, md: 450, lg: 500 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'center' },
          minHeight: { xs: 'auto', md: '100%' },
          py: { xs: 2, md: 4 }
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;