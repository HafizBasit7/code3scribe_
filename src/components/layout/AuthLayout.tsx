import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Logo from '../../../public/assets/images/logo.png';
import Background1 from '../../assets/icons/background1.png';
import Background2 from '../../assets/icons/background2.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        width: '100vw', // Use viewport width instead of 100%
        maxWidth: '100vw', // Ensure no overflow
        overflowX: 'hidden', // Prevent horizontal scroll
        // margin: 0,
        // padding: 0,
      }}
    >
      {/* Left Side - Images with Logo */}
      <Box
        sx={{
          flex: { xs: '0 0 250px', md: '0 0 50%' },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: { xs: '250px', md: '100vh' },
          width: '100%',
          maxWidth: '100%',
          backgroundImage: `url(${Background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Inner Background2 with small margin */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 8, md: 14 },
            left: { xs: 8, md: 14 },
            right: { xs: 8, md: 14 },
            bottom: { xs: 8, md: 14 },
            backgroundImage: `url(${Background2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: { xs: '8px', md: '12px' },
          }}
        />

        {/* Logo */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            px: 2,
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: { xs: 120, sm: 160, md: 200, lg: 260 },
              height: { xs: 120, sm: 160, md: 200, lg: 260 },
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
        </Box>
      </Box>

      {/* Right Side - Form Content */}
      <Box
        sx={{
          flex: { xs: '1 1 auto', md: '0 0 50%' },
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: { xs: 'flex-start', md: 'center' },
          // p: { xs: , sm: 4, md: 1 },
          backgroundColor: '#fff',
          overflow: 'auto',
          minHeight: { xs: 'calc(100vh - 250px)', md: '100vh' },
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: 500, md: 450, lg: 500 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'flex-start', md: 'center' },
            minHeight: { xs: 'auto', md: '100%' },
            py: { xs: 2, md: 4 },
            boxSizing: 'border-box',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;