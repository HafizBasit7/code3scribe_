import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Avatar,
  Collapse,
} from '@mui/material';
import {
  Logout,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import logo from '../../../public/assets/images/logo.png';
import HomeIcon from '../../assets/icons/hom.png';
import ProtocolIcon from '../../assets/icons/hub.png';
import JobsIcon from '../../assets/icons/findJob.png';
import SubscriptionIcon from '../../assets/icons/subscrip.png';
import FAQIcon from '../../assets/icons/FAQ.png';
import LegalIcon from '../../assets/icons/legal.png';
import FeedbackIcon from '../../assets/icons/feedback.png';
import DeleteIcon from '../../assets/icons/delete.png';
import prof from '../../assets/icons/prof.jpg';
import type { MenuItem } from '../../types/navigation';
import { ROUTES } from '../../config/routes';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', path: ROUTES.HOME, icon: HomeIcon },
    { id: 'protocol-hub', label: 'Protocol Hub', path: ROUTES.PROTOCOL_HUB, icon: ProtocolIcon },
    { id: 'find-jobs', label: 'Find Jobs', path: ROUTES.FIND_JOBS, icon: JobsIcon },
    { id: 'subscription', label: 'Subscription', path: ROUTES.SUBSCRIPTION, icon: SubscriptionIcon },
    { id: 'faq', label: 'FAQ', path: ROUTES.FAQ, icon: FAQIcon },
    { 
      id: 'legal', 
      label: 'Legal Disclaimers', 
      path: ROUTES.LEGAL.PRIVACY_POLICY,
      icon: LegalIcon,
      children: [
        { id: 'privacy-policy', label: 'Privacy Policy', path: ROUTES.LEGAL.PRIVACY_POLICY, icon: LegalIcon },
        { id: 'terms-conditions', label: 'Terms & Conditions', path: ROUTES.LEGAL.TERMS_CONDITIONS, icon: LegalIcon },
        { id: 'hipaa-disclaimer', label: 'HIPAA Disclaimer', path: ROUTES.LEGAL.HIPAA_DISCLAIMER, icon: LegalIcon }
      ]
    },
    { 
      id: 'feedback', 
      label: 'Feedback', 
      path: ROUTES.FEEDBACK.REPORT_PROBLEM,
      icon: FeedbackIcon,
      children: [
        { id: 'report-problem', label: 'Report a Problem', path: ROUTES.FEEDBACK.REPORT_PROBLEM, icon: FeedbackIcon },
        { id: 'app-feedback', label: 'App Feedback', path: ROUTES.FEEDBACK.APP_FEEDBACK, icon: FeedbackIcon }
      ]
    },
    { id: 'delete-account', label: 'Delete Account', path: ROUTES.DELETE_ACCOUNT, icon: DeleteIcon }
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      setOpenMenus(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
      // Navigate to first child or parent path
      navigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  const handleSubMenuClick = (item: MenuItem) => {
    navigate(item.path);
  };

   const handleProfileClick = () => {
    navigate(ROUTES.PROFILE);
  };


  const isMenuActive = (item: MenuItem): boolean => {
    return location.pathname === item.path;
  };

  const isParentActive = (item: MenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => location.pathname === child.path);
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = isMenuActive(item);
      const isParentActiveItem = isParentActive(item);
      const isOpen = openMenus[item.id] || false;

      return (
        <Box key={item.id}>
          {/* Parent Menu Item */}
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <Button
              fullWidth
              onClick={() => handleMenuClick(item)}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                px: 3,
                py: 0.75,
                color: 'white',
                fontSize: '12px',
                fontWeight: (isActive || isParentActiveItem) ? 600 : 400,
                borderRadius: 2,
                backgroundColor: (isActive || isParentActiveItem) ? 'rgba(54, 128, 218, 1)' : 'transparent',
                '&:hover': { 
                  bgcolor: 'rgba(54, 128, 218, 1)',
                },
                gap: 1,
              }}
            >
              <img 
                src={item.icon} 
                alt={`${item.label} icon`} 
                width={18} 
                height={18} 
              />
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '11px',
                  fontWeight: (isActive || isParentActiveItem) ? 600 : 400,
                }}
                sx={{ flex: 1 }}
              />
              {hasChildren && (
                isOpen ? <ExpandLess sx={{ fontSize: 16 }} /> : <ExpandMore sx={{ fontSize: 16 }} />
              )}
            </Button>
          </ListItem>

          {/* Child Menu Items */}
          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 3 }}>
                {item.children!.map((child) => (
                  <ListItem key={child.id} disablePadding sx={{ mb: 0.5 }}>
                    <Button
                      fullWidth
                      onClick={() => handleSubMenuClick(child)}
                      sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        px: 3,
                        py: 0.5,
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: isMenuActive(child) ? 600 : 400,
                        borderRadius: 2,
                        backgroundColor: isMenuActive(child) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                        '&:hover': { 
                          bgcolor: 'rgba(54, 128, 218, 0.6)',
                        },
                        gap: 1,
                        minHeight: '32px'
                      }}
                    >
                      <img 
                        src={child.icon} 
                        alt={`${child.label} icon`} 
                        width={14} 
                        height={14} 
                      />
                      <ListItemText
                        primary={child.label}
                        primaryTypographyProps={{
                          fontSize: '9px',
                          fontWeight: isMenuActive(child) ? 600 : 400,
                        }}
                      />
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
         background: 'linear-gradient(180deg, rgba(214, 190, 255, 1) 0%, rgba(82, 149, 226, 1) 100%)',
 border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '10px',
          color: 'white',
          margin: 0,
          position: 'fixed',
          height: '97vh',
          overflow: 'hidden',
          m: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Brand Header */}
      <Toolbar sx={{ py: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <img
          src={logo}
          alt="Code3Scribe Logo"
          style={{
            width: 50,
            height: 50,
            objectFit: 'contain',
          }}
        />
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: '24px',
            letterSpacing: '0.5px',
          }}
        >
          Code3Scribe
        </Typography>
      </Toolbar>
      
      {/* Navigation Menu */}
      <List sx={{ px: 1, overflow: 'hidden', flex: 1 }}>
        {renderMenuItems(menuItems)}
      </List>

      {/* User Profile Section */}
      <Box sx={{ 
        p: 2,
      }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            mb: 0.5,
            cursor: 'pointer',
            borderRadius: 2,
            p: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
          onClick={handleProfileClick}
        >
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              border: '2px solid rgba(255,255,255,0.3)'
            }}
            src={prof}
          >
            SP
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '14px',
                color: 'white'
              }}
            >
              Sergio Perez
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '12px',
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              sergioperez@c38.com
            </Typography>
          </Box>
        </Box>

        
        {/* Logout Button */}
        <Button
          fullWidth
          onClick={onLogout}
          sx={{
            // background: 'rgba(255,255,255,0.2)',
            color: 'white',
            borderRadius: 2,
            py: 1,
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 1,
            '&:hover': {
              background: 'rgba(255,255,255,0.3)',
            },
          }}
        >
          <Logout sx={{ fontSize: 16 }} />
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;