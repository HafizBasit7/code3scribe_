import React, { useState, useCallback } from 'react';
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
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  IconButton
} from '@mui/material';
import {
  Logout,
  ExpandLess,
  ExpandMore,
  Menu,
  Close
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
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
import { 
  selectUser, 
  selectUserEmail, 
  selectUserName,
  selectUserId,
  selectRefreshToken
} from '../../store/selectors/authSelectors';
import { logout } from '../../store/slices/authSlice';
import { logoutUser } from '../../services/authApi';

interface SidebarProps {
  onLogout?: () => void; // Make optional since we're handling it internally now
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Get user data from Auth slice (Redux store)
  const user = useSelector(selectUser);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const refreshToken = useSelector(selectRefreshToken);

  console.log('Sidebar User Data from Redux:', {
    user,
    userName,
    userEmail,
    userId
  });

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

  // Professional logout handler with API call
const handleLogout = useCallback(async () => {
  if (isLoggingOut) return;
  
  try {
    setIsLoggingOut(true);
    
    // Get refreshToken directly from localStorage since it might not be in Redux
    const refreshTokenFromStorage = localStorage.getItem('refreshToken');
    
    // Call logout API if we have the required data
    if (userId && refreshTokenFromStorage) {
      try {
        await logoutUser({
          userid: userId,
          deviceType: 1,
          userDeviceToken: '',
          refreshToken: refreshTokenFromStorage, // Use from storage
        });
        console.log('Logout API call successful');
      } catch (apiError) {
        console.warn('Logout API call failed, but continuing with client-side logout:', apiError);
        // Continue with client-side logout even if API fails
      }
    } else {
      console.warn('Missing userId or refreshToken for API logout, continuing with client-side logout');
    }

    // Dispatch logout action to clear Redux state
    dispatch(logout());

    // Clear any additional localStorage items
    localStorage.removeItem('userData');
    localStorage.removeItem('loginTimestamp');

    // Navigate to login page
    navigate('/login');

    // Call parent logout handler if provided
    if (onLogout) {
      onLogout();
    }

    console.log('Logout completed successfully');

  } catch (error) {
    console.error('Logout error:', error);
    // Even if there's an error, clear client-side state
    dispatch(logout());
    navigate('/login');
  } finally {
    setIsLoggingOut(false);
  }
}, [dispatch, navigate, userId, onLogout, isLoggingOut]);
  const handleMenuClick = useCallback((item: MenuItem) => {
    if (item.children) {
      setOpenMenus(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
      navigate(item.path);
    } else {
      navigate(item.path);
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  }, [navigate, isMobile]);

  const handleSubMenuClick = useCallback((item: MenuItem) => {
    navigate(item.path);
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [navigate, isMobile]);

  const handleProfileClick = useCallback(() => {
    navigate(ROUTES.PROFILE);
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [navigate, isMobile]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const isMenuActive = useCallback((item: MenuItem): boolean => {
    return location.pathname === item.path;
  }, [location.pathname]);

  const isParentActive = useCallback((item: MenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => location.pathname === child.path);
  }, [location.pathname]);

  // Function to get user initials for avatar
  const getUserInitials = useCallback(() => {
    if (!userName) return 'U';
    
    const names = userName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return userName[0].toUpperCase();
  }, [userName]);

  const renderMenuItems = useCallback((items: MenuItem[]) => {
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
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 0.75 },
                color: 'white',
                fontSize: { xs: '14px', md: '12px' },
                fontWeight: (isActive || isParentActiveItem) ? 600 : 400,
                borderRadius: 2,
                backgroundColor: (isActive || isParentActiveItem) ? 'rgba(54, 128, 218, 1)' : 'transparent',
                '&:hover': { 
                  bgcolor: 'rgba(54, 128, 218, 1)',
                },
                gap: 1,
                minHeight: { xs: '48px', md: 'auto' }
              }}
            >
              <img 
                src={item.icon} 
                alt={`${item.label} icon`} 
                width={isMobile ? 20 : 18} 
                height={isMobile ? 20 : 18} 
              />
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: { xs: '14px', md: '11px' },
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
              <List component="div" disablePadding sx={{ pl: { xs: 2, md: 3 } }}>
                {item.children!.map((child) => (
                  <ListItem key={child.id} disablePadding sx={{ mb: 0.5 }}>
                    <Button
                      fullWidth
                      onClick={() => handleSubMenuClick(child)}
                      sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        px: { xs: 2, md: 3 },
                        py: { xs: 1, md: 0.5 },
                        color: 'white',
                        fontSize: { xs: '13px', md: '11px' },
                        fontWeight: isMenuActive(child) ? 600 : 400,
                        borderRadius: 2,
                        backgroundColor: isMenuActive(child) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                        '&:hover': { 
                          bgcolor: 'rgba(54, 128, 218, 0.6)',
                        },
                        gap: 1,
                        minHeight: { xs: '44px', md: '32px' }
                      }}
                    >
                      <img 
                        src={child.icon} 
                        alt={`${child.label} icon`} 
                        width={isMobile ? 16 : 14} 
                        height={isMobile ? 16 : 14} 
                      />
                      <ListItemText
                        primary={child.label}
                        primaryTypographyProps={{
                          fontSize: { xs: '13px', md: '9px' },
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
  }, [isMenuActive, isParentActive, openMenus, handleMenuClick, handleSubMenuClick, isMobile]);

  const drawerContent = (
    <>
      {/* Brand Header */}
      <Toolbar sx={{ 
        py: { xs: 1, md: 2 }, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5,
        minHeight: { xs: '64px', md: 'auto' } 
      }}>
        <img
          src={logo}
          alt="Code3Scribe Logo"
          style={{
            width: isMobile ? 40 : 50,
            height: isMobile ? 40 : 50,
            objectFit: 'contain',
          }}
        />
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="div"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: { xs: '20px', md: '24px' },
            letterSpacing: '0.5px',
          }}
        >
          Code3Scribe
        </Typography>
        
        {/* Close button for mobile */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ 
              color: 'white', 
              ml: 'auto',
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <Close />
          </IconButton>
        )}
      </Toolbar>
      
      {/* Navigation Menu */}
      <List sx={{ 
        px: { xs: 0.5, md: 1 }, 
        overflow: 'hidden', 
        flex: 1,
        mt: { xs: 1, md: 0 }
      }}>
        {renderMenuItems(menuItems)}
      </List>

      {/* User Profile Section */}
      <Box sx={{ 
        p: { xs: 1, md: 2 },
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
              width: { xs: 36, md: 40 }, 
              height: { xs: 36, md: 40 },
              border: '2px solid rgba(255,255,255,0.3)',
              bgcolor: 'rgba(255,255,255,0.2)',
              fontSize: { xs: '14px', md: '16px' },
              fontWeight: 600
            }}
            src={prof}
          >
            {getUserInitials()}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                fontSize: { xs: '13px', md: '14px' },
                color: 'white',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {userName || 'Loading...'}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '11px', md: '12px' },
                color: 'rgba(255,255,255,0.8)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {userEmail || 'Loading email...'}
            </Typography>
          </Box>
        </Box>

        {/* Logout Button */}
        <Button
          fullWidth
          onClick={handleLogout}
          disabled={isLoggingOut}
          sx={{
            color: 'white',
            borderRadius: 2,
            py: { xs: 0.75, md: 1 },
            fontSize: { xs: '13px', md: '12px' },
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 1,
            '&:hover': {
              background: 'rgba(255,255,255,0.3)',
            },
            '&:disabled': {
              color: 'rgba(255,255,255,0.5)',
            },
          }}
        >
          <Logout sx={{ fontSize: { xs: 14, md: 16 } }} />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          background: 'linear-gradient(180deg, rgba(214, 190, 255, 1) 0%, rgba(82, 149, 226, 1) 100%)',
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          px: 2,
          zIndex: 1300,
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: 'white', mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Code3Scribe
          </Typography>
        </Box>

        {/* Swipeable Drawer for Mobile */}
        <SwipeableDrawer
          variant="temporary"
          open={mobileOpen}
          onOpen={handleDrawerToggle}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 280,
              background: 'linear-gradient(180deg, rgba(214, 190, 255, 1) 0%, rgba(82, 149, 226, 1) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '0 10px 10px 0',
              color: 'white',
              overflow: 'hidden',
            },
          }}
        >
          {drawerContent}
        </SwipeableDrawer>
      </>
    );
  }

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
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;