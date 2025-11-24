import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import prof from '../assets/icons/prof.jpg'; // Import your profile image

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

  const userData = {
    firstName: 'Sergio',
    lastName: 'Perez',
    contactNumber: '(483) 500-1865',
    email: 'sergioperez@c3s.com'
  };

  const handleEditClick = () => {
    setMode('edit');
  };

  const handleChangePasswordClick = () => {
    setMode('changePassword');
  };

  const handleCancel = () => {
    setMode('view');
    // Reset form data to original values
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
  };

  const handleSave = () => {
    // Handle save logic here
    setMode('view');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderProfileContent = () => {
    switch (mode) {
      case 'edit':
        return (
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: 'rgba(14, 97, 192, 1)',
                mb: 3
              }}
            >
              Edit Personal Information
            </Typography>

            {/* First Name */}
            <Box sx={{ mb: 2 }}>
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
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(14, 97, 192, 1)',
                    },
                  }
                }}
              />
            </Box>

            {/* Last Name */}
            <Box sx={{ mb: 2 }}>
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
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(14, 97, 192, 1)',
                    },
                  }
                }}
              />
            </Box>

            {/* Contact Number */}
            <Box sx={{ mb: 2 }}>
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
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(14, 97, 192, 1)',
                    },
                  }
                }}
              />
            </Box>

            {/* Email Address */}
            <Box sx={{ mb: 3 }}>
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
                size="small"
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

      case 'changePassword':
        return (
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: 'rgba(14, 97, 192, 1)',
                mb: 3
              }}
            >
              Change Password
            </Typography>

            {/* Old Password */}
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
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(14, 97, 192, 1)',
                    },
                  }
                }}
              />
            </Box>

            {/* New Password */}
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
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(14, 97, 192, 1)',
                    },
                  }
                }}
              />
            </Box>

            {/* Confirm New Password */}
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
                size="small"
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

      default: // view mode
        return (
          <Box sx={{ flex: 1 }}>
            {/* <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: 'rgba(14, 97, 192, 1)',
                mb: 3
              }}
            >
              Personal Information
            </Typography> */}
            {/* User Info */}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'rgba(14, 97, 192, 1)',
                
                  
                }}
              >
                Sergio Perez
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#64748b',
                  fontSize: '0.9rem',
                 mb: 3,
                }}
              >
                sergioperez@c3s.com
              </Typography>

           {/* First Name */}
<Box sx={{ mb: 1.5, display: 'flex' }}>
  <Typography 
    sx={{ 
      fontWeight: 600, 
      color: '#374151',
      width: 200 // label width to align all fields
    }}
  >
    First Name:
  </Typography>

  <Typography sx={{ color: '#111827' }}>
    {userData.firstName || '-'}
  </Typography>
</Box>


          {/* Last Name */}
<Box sx={{ mb: 1.5, display: 'flex' }}>
  <Typography 
    sx={{ 
      fontWeight: 600, 
      color: '#374151',
      width: 200   // same width for perfect alignment
    }}
  >
    Last Name:
  </Typography>

  <Typography sx={{ color: '#111827' }}>
    {userData.lastName || '-'}
  </Typography>
</Box>

{/* Contact Number */}
<Box sx={{ mb: 1.5, display: 'flex' }}>
  <Typography 
    sx={{ 
      fontWeight: 600, 
      color: '#374151',
      width: 200
    }}
  >
    Contact Number:
  </Typography>

  <Typography sx={{ color: '#111827' }}>
    {userData.contactNumber || '-'}
  </Typography>
</Box>

{/* Email Address */}
<Box sx={{ mb: 1.5, display: 'flex' }}>
  <Typography 
    sx={{ 
      fontWeight: 600, 
      color: '#374151',
      width: 200
    }}
  >
    Email Address:
  </Typography>

  <Typography sx={{ color: '#111827' }}>
    {userData.email || '-'}
  </Typography>
</Box>

          </Box>
        );
    }
  };

  const renderActionButtons = () => {
    if (mode === 'view') {
      return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          <Button
            variant="outlined"
            // startIcon={<LockIcon />}
            onClick={handleChangePasswordClick}
            sx={{
               background: 'linear-gradient(135deg, rgba(14,97,192,1) 100%)',
             color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              px: 3,
              '&:hover': {
                borderColor: 'rgba(14, 97, 192, 1)',
                backgroundColor: 'rgba(14, 97, 192, 0.04)',
              }
            }}
          >
            Change password
          </Button>
          <Button
            variant="contained"
            // startIcon={<EditIcon />}
            onClick={handleEditClick}
            sx={{
              background: 'linear-gradient(135deg, rgba(193, 160, 249, 1) 100%, rgba(14,97,192,1) 100%)',
              color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              px: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(14,97,192,1) 0%, rgba(82,149,226,1) 100%)',
              }
            }}
          >
            Edit profile
          </Button>
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleCancel}
            sx={{
              borderColor: '#64748b',
              color: '#64748b',
              borderRadius: 2,
              fontWeight: 600,
              px: 3,
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
              px: 3,
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
  };

  return (
    <Box sx={{ 
      p: 3, 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      minWidth: 0,
      overflow: 'auto',
    }}>
      

      {/* Profile Card - Horizontal Layout */}
      <Card 
        sx={{ 
          borderRadius: 2,
          background: 'white',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          maxWidth: 900,
          mx: 'auto',
          width: '100%'
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', p: 4 }}>
            {/* Left Side - User Image Box and Basic Info */}
            <Box sx={{ 
              width: 220, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
            //   pr: 4,
              mr: 4
            }}>
              {/* Rectangular Image Box */}
              <Box
                sx={{
                  width: 280,
                  height: 280,
                //   border: '2px solid rgba(82,149,226,0.3)',
                //   borderRadius: 2,
                  mb: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8fafc'
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
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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