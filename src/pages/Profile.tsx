import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import prof from '../assets/icons/prof.jpg';

type ProfileMode = 'view' | 'edit' | 'changePassword';

const Profile: React.FC = () => {
  const [mode, setMode] = useState<ProfileMode>('view');
  const [formData, setFormData] = useState({
    firstName: 'Sergio',
    lastName: 'Perez',
    contactNumber: '(483) 500-1865',
    email: 'sergioperez@c3s.com'
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const userData = {
    firstName: 'Sergio',
    lastName: 'Perez',
    contactNumber: '(483) 500-1865',
    email: 'sergioperez@c3s.com'
  };

  const handleEditClick = useCallback(() => {
    setMode('edit');
    // Scroll to top when entering edit mode on mobile
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isMobile]);

  const handleChangePasswordClick = useCallback(() => {
    setMode('changePassword');
    // Scroll to top when entering change password mode on mobile
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isMobile]);

  const handleCancel = useCallback(() => {
    setMode('view');
    setFormData({
      firstName: 'Sergio',
      lastName: 'Perez',
      contactNumber: '(483) 500-1865',
      email: 'sergioperez@c3s.com'
    });
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, []);

  const handleSave = useCallback(() => {
    setMode('view');
  }, []);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handlePasswordChange = useCallback((field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const renderProfileContent = useCallback(() => {
    switch (mode) {
      case 'edit':
        return (
          <Box sx={{ flex: 1, minHeight: isMobile ? 'auto' : '400px' }}>
            {/* <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                fontWeight: 600, 
                color: 'rgba(14, 97, 192, 1)',
                mb: 3,
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              Edit Personal Information
            </Typography> */}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#374151',
                      mb: 1
                    }}
                  >
                    First Name:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(14, 97, 192, 1)',
                        },
                      }
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#374151',
                      mb: 1
                    }}
                  >
                    Last Name:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(14, 97, 192, 1)',
                        },
                      }
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 1 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#374151',
                      mb: 1
                    }}
                  >
                    Contact Number:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(14, 97, 192, 1)',
                        },
                      }
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 1 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#374151',
                      mb: 1
                    }}
                  >
                    Email Address:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(14, 97, 192, 1)',
                        },
                      }
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );

      case 'changePassword':
        return (
          <Box sx={{ flex: 1, minHeight: isMobile ? 'auto' : '400px' }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                fontWeight: 600, 
                color: 'rgba(14, 97, 192, 1)',
                mb: 3,
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              Change Password
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#374151',
                  mb: 1
                }}
              >
                Old Password:
              </Typography>
              <TextField
                fullWidth
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(14, 97, 192, 1)',
                    },
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#374151',
                  mb: 1
                }}
              >
                New Password:
              </Typography>
              <TextField
                fullWidth
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(14, 97, 192, 1)',
                    },
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#374151',
                  mb: 1
                }}
              >
                Confirm New Password:
              </Typography>
              <TextField
                fullWidth
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(14, 97, 192, 1)',
                    },
                  }
                }}
              />
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                fontWeight: 600, 
                color: 'rgba(14, 97, 192, 1)',
                mb: 1,
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              Sergio Perez
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748b',
                fontSize: { xs: '0.875rem', sm: '0.9rem' },
                mb: 3,
              }}
            >
              sergioperez@c3s.com
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: { xs: 2, sm: 1.5 } }}>
                  <Typography 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#374151',
                      mb: 0.5,
                      fontSize: { xs: '0.875rem', sm: '0.9rem' }
                    }}
                  >
                    First Name:
                  </Typography>
                  <Typography sx={{ color: '#111827', fontSize: { xs: '0.875rem', sm: '0.9rem' } }}>
                    {userData.firstName || '-'}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: { xs: 2, sm: 1.5 } }}>
                  <Typography 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#374151',
                      mb: 0.5,
                      fontSize: { xs: '0.875rem', sm: '0.9rem' }
                    }}
                  >
                    Last Name:
                  </Typography>
                  <Typography sx={{ color: '#111827', fontSize: { xs: '0.875rem', sm: '0.9rem' } }}>
                    {userData.lastName || '-'}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: { xs: 2, sm: 1.5 } }}>
                  <Typography 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#374151',
                      mb: 0.5,
                      fontSize: { xs: '0.875rem', sm: '0.9rem' }
                    }}
                  >
                    Contact Number:
                  </Typography>
                  <Typography sx={{ color: '#111827', fontSize: { xs: '0.875rem', sm: '0.9rem' } }}>
                    {userData.contactNumber || '-'}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: { xs: 2, sm: 1.5 } }}>
                  <Typography 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#374151',
                      mb: 0.5,
                      fontSize: { xs: '0.875rem', sm: '0.9rem' }
                    }}
                  >
                    Email Address:
                  </Typography>
                  <Typography sx={{ color: '#111827', fontSize: { xs: '0.875rem', sm: '0.9rem' } }}>
                    {userData.email || '-'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
    }
  }, [mode, formData, passwordData, userData, handleInputChange, handlePasswordChange, isMobile]);

  const renderActionButtons = useCallback(() => {
    if (mode === 'view') {
      return (
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap', 
          mt: 2,
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
          <Button
            variant="outlined"
            onClick={handleChangePasswordClick}
            sx={{
              background: 'rgba(14, 97, 192, 1)',
              color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '0.9rem' },
              minWidth: { xs: '140px', sm: 'auto' },
              '&:hover': {
                background: 'rgba(14, 97, 192, 0.9)',
              }
            }}
          >
            Change password
          </Button>
          <Button
            variant="contained"
            onClick={handleEditClick}
            sx={{
              background: 'linear-gradient(135deg, rgba(193, 160, 249, 1) 0%, rgba(56, 135, 225, 1) 100%)',
              color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '0.9rem' },
              minWidth: { xs: '140px', sm: 'auto' },
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(56, 135, 225, 1) 0%, rgba(193, 160, 249, 1) 100%)',
              }
            }}
          >
            Edit profile
          </Button>
        </Box>
      );
    } else {
      return (
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap', 
          mt: 2,
          justifyContent: { xs: 'center', sm: 'flex-start' },
          position: isMobile ? 'sticky' : 'static',
          bottom: isMobile ? 0 : 'auto',
          backgroundColor: isMobile ? 'white' : 'transparent',
          py: isMobile ? 2 : 0,
          borderTop: isMobile ? '1px solid #e2e8f0' : 'none',
          zIndex: isMobile ? 10 : 'auto'
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleCancel}
            sx={{
              borderColor: '#64748b',
              color: '#64748b',
              borderRadius: 2,
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '0.9rem' },
              minWidth: { xs: '120px', sm: 'auto' },
              '&:hover': {
                borderColor: '#374151',
                backgroundColor: 'rgba(100, 116, 139, 0.04)',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: 'linear-gradient(135deg, rgba(82,149,226,1) 0%, rgba(14,97,192,1) 100%)',
              color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '0.9rem' },
              minWidth: { xs: '120px', sm: 'auto' },
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(14,97,192,1) 0%, rgba(82,149,226,1) 100%)',
              }
            }}
          >
            Save
          </Button>
        </Box>
      );
    }
  }, [mode, handleChangePasswordClick, handleEditClick, handleCancel, handleSave, isMobile]);

  const imageSize = isMobile ? 200 : isTablet ? 250 : 280;

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      minWidth: 0,
      overflow: 'auto',
      // Ensure the page is scrollable on mobile in edit modes
      minHeight: isMobile && (mode === 'edit' || mode === 'changePassword') ? '100vh' : 'auto'
    }}>
      {/* Profile Card - Responsive Layout */}
      <Card 
        sx={{ 
          borderRadius: { xs: 1.5, md: 2 },
          background: 'white',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          maxWidth: 900,
          mx: 'auto',
          width: '100%',
          // Ensure card doesn't get cut off on mobile
          mb: isMobile && (mode === 'edit' || mode === 'changePassword') ? 8 : 0
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ 
            display: 'flex', 
            p: { xs: 2, sm: 3, md: 4 },
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' }
          }}>
            {/* Left Side - User Image */}
            <Box sx={{ 
              width: { xs: '100%', md: '220px' }, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              mr: { xs: 0, md: 4 },
              mb: { xs: 3, md: 0 }
            }}>
              <Box
                sx={{
                  width: { xs: imageSize * 0.8, sm: imageSize },
                  height: { xs: imageSize * 0.8, sm: imageSize },
                  mb: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8fafc',
                  borderRadius: { xs: 1.5, md: 2 }
                }}
              >
                <img
                  src={prof}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Box>

            {/* Right Side - Dynamic Content */}
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              width: '100%',
              // Ensure content area is properly sized for scrolling
              minHeight: isMobile && (mode === 'edit' || mode === 'changePassword') ? '400px' : 'auto'
            }}>
              {renderProfileContent()}
              {renderActionButtons()}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;