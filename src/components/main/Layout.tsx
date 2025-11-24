import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      bgcolor: '#f8fafc', 
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flex: 1,
          bgcolor: '#f8fafc', 
          display: 'flex', 
          flexDirection: 'column',
          height: { xs: 'calc(100vh - 80px)', md: '100vh' },
          overflow: 'hidden',
          marginLeft: { xs: 0, md: '10px' },
          width: { 
            xs: '100vw', 
            md: 'calc(100vw - 280px)' 
          },
          minWidth: 0,
          ml: { xs: 0, md: 3 },
          mt: { xs: '80px', md: 0 }
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;