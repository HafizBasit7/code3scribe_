import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      bgcolor: '#f8fafc', 
      overflow: 'hidden',
      margin: 0,
      padding: 0 
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
          height: '100vh',
          overflow: 'hidden',
          marginLeft: '10px',
          width: 'calc(100vw - 280px)',
          minWidth: 0,
          ml: 3
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;