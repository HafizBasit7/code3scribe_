import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Grid as MuiGrid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import prof from '../assets/icons/prof.jpg';
import { logoutUser } from '../services/authApi';
import { logout } from '../store/slices/authSlice';
import { 
  selectUserId, 
  selectIsAuthenticated, 
  selectAuth,
  selectUserName
} from '../store/selectors/authSelectors';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../services/profileApi'; // ADD deleteUserAccount
import { setProfile, setProfileLoading, setProfileError, updateProfile } from '../store/slices/profileSlice';
import { selectUserProfile, selectProfileLoading } from '../store/selectors/profileSelectors';

type ProfileMode = 'view' | 'edit' | 'changePassword';

const Profile: React.FC = () => {
  const Grid = MuiGrid as React.ComponentType<any>;
  const [mode, setMode] = useState<ProfileMode>('view');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // NEW: Delete confirmation modal state
  const [deleteLoading, setDeleteLoading] = useState(false); // NEW: Delete loading state
  
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    role: '',
    agencyType: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIdFromRedux = useSelector(selectUserId);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authState = useSelector(selectAuth);
  const profile = useSelector(selectUserProfile);
  const profileLoading = useSelector(selectProfileLoading);
  const userNameFromRedux = useSelector(selectUserName);

  const userId = userIdFromRedux || localStorage.getItem('userId');

  // NEW: Delete User Handler
  const handleDeleteAccount = useCallback(async () => {
    if (!userId) {
      setSnackbar({
        open: true,
        message: 'User ID not available',
        severity: 'error'
      });
      return;
    }

    try {
      setDeleteLoading(true);
      
      // Call delete API
      await deleteUserAccount(userId);
      
      // Logout user after successful deletion
      dispatch(logout());
      
      setSnackbar({
        open: true,
        message: 'Account deleted successfully',
        severity: 'success'
      });
      
      // Navigate to login page
      navigate('/login');
      
    } catch (error: any) {
      console.error('Delete account failed:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to delete account',
        severity: 'error'
      });
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
    }
  }, [userId, dispatch, navigate]);

  // NEW: Open delete confirmation dialog
  const handleOpenDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  // NEW: Close delete confirmation dialog
  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  // Rest of your existing handlers remain the same...
  // const handleLogout = useCallback(async () => {
  //   try {
  //     dispatch(setProfileLoading(true));
      
  //     const logoutData = {
  //       userid: userId || '',
  //       deviceType: 1,
  //       userDeviceToken: '',
  //       refreshToken: localStorage.getItem('refreshToken') || ''
  //     };

  //     await logoutUser(logoutData);
  //     dispatch(logout());
  //     navigate('/login');
      
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //     dispatch(logout());
  //     navigate('/login');
  //   } finally {
  //     dispatch(setProfileLoading(false));
  //   }
  // }, [dispatch, navigate, userId]);

  const handleEditClick = useCallback(() => {
    setMode('edit');
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isMobile]);

  const handleChangePasswordClick = useCallback(() => {
    setMode('changePassword');
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isMobile]);

  const handleCancel = useCallback(() => {
    setMode('view');
    if (profile) {
      setFormData({
        userName: userNameFromRedux || profile.userName || '', // Use Redux name
        email: profile.email || '',
        phoneNumber: profile.phoneNumber || '',
        role: profile.role || '',
        agencyType: profile.agencyType || '',
      });
    }
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, [profile, userNameFromRedux]);

  const handleSave = useCallback(async () => {
    if (!userId) {
      setSnackbar({
        open: true,
        message: 'User ID not available',
        severity: 'error'
      });
      return;
    }

    try {
      dispatch(setProfileLoading(true));
      const updatedProfile = await updateUserProfile(userId, formData);
      dispatch(updateProfile(updatedProfile));
      
      setMode('view');
      setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success'
      });
    } catch (error: any) {
      dispatch(setProfileError(error.response?.data?.message || 'Failed to update profile'));
      setSnackbar({
        open: true,
        message: 'Failed to update profile',
        severity: 'error'
      });
    } finally {
      dispatch(setProfileLoading(false));
    }
  }, [userId, formData, dispatch]);

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

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  // Fetch profile data on component mount
  useEffect(() => {
    console.log('useEffect triggered - userId:', userId);
    
    const fetchProfile = async () => {
      if (userId && userId !== 'null' && userId !== 'undefined' && userId.length > 10) {
        try {
          console.log('Starting to fetch profile for userId:', userId);
          dispatch(setProfileLoading(true));
          
          const profileData = await getUserProfile(userId);
          console.log('Profile data received:', profileData);
          
          dispatch(setProfile(profileData));
          
          // Initialize form data with profile data + user name from Redux
          setFormData({
            userName: userNameFromRedux || profileData.userName || '', // Use Redux name first
            email: profileData.email || '',
            phoneNumber: profileData.phoneNumber || '',
            role: profileData.role || '',
            agencyType: profileData.agencyType || '',
          });
        } catch (error: any) {
          console.error('Error fetching profile:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch profile';
          dispatch(setProfileError(errorMessage));
          setSnackbar({
            open: true,
            message: errorMessage,
            severity: 'error'
          });
        } finally {
          dispatch(setProfileLoading(false));
        }
      } else {
        console.log('No valid userId available, skipping profile fetch');
        console.log('Available localStorage userId:', localStorage.getItem('userId'));
        console.log('Auth state user:', authState.user);
      }
    };

    fetchProfile();
  }, [userId, dispatch, authState.user, userNameFromRedux]);

  // Updated renderProfileContent function with Delete Button
  const renderProfileContent = useCallback(() => {
    console.log('renderProfileContent - profileLoading:', profileLoading, 'profile:', profile);
    
    if (profileLoading) {
      return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading profile data...
          </Typography>
        </Box>
      );
    }

    if (!profile) {
      return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: 200 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No profile data available
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            User ID: {userId || 'Not available'}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Please make sure you are logged in correctly.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry Loading
          </Button>
        </Box>
      );
    }

    switch (mode) {
      case 'edit':
        return (
          <Box sx={{ flex: 1, minHeight: isMobile ? 'auto' : '400px' }}>
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
                    User Name:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.userName}
                    onChange={(e) => handleInputChange('userName', e.target.value)}
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
                    Phone Number:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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
            {/* Email on top with Delete Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.3 }}>
              <Typography 
                variant="body1"
                sx={{ 
                  fontWeight: 600, 
                  color: 'rgba(54, 128, 218, 1)',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                {profile.email}
              </Typography>
              
              {/* Delete Account Button */}
              <IconButton
                onClick={handleOpenDeleteDialog}
                sx={{
                  color: '#d32f2f',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.04)',
                  }
                }}
                title="Delete Account"
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            {/* Full Name under email */}
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                fontWeight: 600, 
                color: '#000',
                mb: 3,
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}
            >
              {userNameFromRedux || profile.userName} {/* Use Redux name */}
            </Typography>

            {/* Profile fields */}
            {[
              { label: "User Name", value: userNameFromRedux || profile.userName }, // Use Redux name
              { label: "Phone Number", value: profile.phoneNumber },
              { label: "Email Address", value: profile.email },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.2,
                  borderBottom: "1px solid #e5e7eb"
                }}
              >
                <Typography 
                  sx={{ 
                    fontWeight: 600, 
                    color: "#374151",
                    fontSize: { xs: "0.875rem", sm: "0.9rem" },
                    width: "40%",
                    whiteSpace: "nowrap"
                  }}
                >
                  {item.label}:
                </Typography>

                <Typography 
                  sx={{ 
                    color: "#111827",
                    fontSize: { xs: "0.875rem", sm: "0.9rem" },
                    width: "55%",
                    textAlign: "right",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {item.value || "N/A"}
                </Typography>
              </Box>
            ))}
          </Box>
        );
    }
  }, [mode, formData, passwordData, profile, profileLoading, handleInputChange, handlePasswordChange, isMobile, userNameFromRedux, handleOpenDeleteDialog]);

  // Rest of your existing renderActionButtons function remains the same...
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
          {/* <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: '#d32f2f',
              color: '#d32f2f',
              borderRadius: 2,
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '0.9rem' },
              minWidth: { xs: '140px', sm: 'auto' },
              '&:hover': {
                borderColor: '#b71c1c',
                backgroundColor: 'rgba(211, 47, 47, 0.04)',
              }
            }}
          >
            Logout
          </Button> */}
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
            disabled={profileLoading}
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
          {/* <Button
            variant="contained"
            onClick={handleSave}
            disabled={profileLoading}
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
            {profileLoading ? 'Saving...' : 'Save'}
          </Button> */}
        </Box>
      );
    }
  }, [mode, handleChangePasswordClick, handleEditClick, handleCancel, handleSave, profileLoading, isMobile]);

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
      minHeight: isMobile && (mode === 'edit' || mode === 'changePassword') ? '100vh' : 'auto'
    }}>
      <Card 
        sx={{ 
          borderRadius: { xs: 1.5, md: 2 },
          background: 'white',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          maxWidth: 900,
          mx: 'auto',
          width: '100%',
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
              minHeight: isMobile && (mode === 'edit' || mode === 'changePassword') ? '400px' : 'auto'
            }}>
              {renderProfileContent()}
              {renderActionButtons()}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* NEW: Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: '#d32f2f', fontWeight: 600 }}>
          Delete Account
        </DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description" sx={{ mt: 1 }}>
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            disabled={deleteLoading}
            sx={{ color: '#64748b' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            disabled={deleteLoading}
            variant="contained"
            sx={{
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#b71c1c',
              }
            }}
          >
            {deleteLoading ? 'Deleting...' : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;