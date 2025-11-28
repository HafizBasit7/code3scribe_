// pages/History.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  IconButton,
  Button,
  Checkbox,
  Snackbar,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId, selectToken } from '../store/selectors/authSelectors';
import { getUserResponseHistory, UserResponseHistory, deleteUserResponses } from '../services/aiApi';
import HistoryCard from '../components/HistoryCard/HistoryCard';

// Custom icons using your assets
const EditIcon = () => <img src="/src/assets/icons/edit.png" alt="Edit" style={{ width: 20, height: 20 }} />;
const DeleteIcon = () => <img src="/src/assets/icons/delete.png" alt="Delete" style={{ width: 20, height: 20 }} />;
import DeleteSelect from '/src/assets/icons/DeleteSelect.png';
import CrossSelect from '/src/assets/icons/CrossSelect.png';

const History: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Redux selectors
  const userId = useSelector(selectUserId);
  const authToken = useSelector(selectToken);

  // State for history data
  const [historyItems, setHistoryItems] = useState<UserResponseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for selection mode
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Fetch user response history
  useEffect(() => {
    const fetchUserHistory = async () => {
      if (!userId || !authToken) {
        console.log('🟡 No user ID or token available for fetching history');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log('🟡 Fetching history for user:', userId);
        const response = await getUserResponseHistory(userId, authToken);

        if (response.success && response.data) {
          console.log('🟢 History data received:', response.data.length, 'items');
          setHistoryItems(response.data);
        } else {
          setError(response.message || 'Failed to load history');
          console.warn('🟡 History fetch warning:', response.message);
        }
      } catch (err: any) {
        console.error('🔴 Error fetching history:', err);
        setError('Failed to load history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [userId, authToken]);

  // ADD THIS FUNCTION: Handle report updates from HistoryCard
  const handleReportUpdate = (updatedItem: UserResponseHistory) => {
    console.log('🟡 Updating report in parent:', updatedItem.id);
    setHistoryItems(prevItems => 
      prevItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  // Handle selection toggle
  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === historyItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(historyItems.map(item => item.id));
    }
  };

  // Handle delete selected items
  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;

    try {
      setDeleteLoading(true);
      const response = await deleteUserResponses(selectedItems);

      if (response.success) {
        // Remove deleted items from state
        setHistoryItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
        setIsSelectionMode(false);
        setSnackbar({
          open: true,
          message: `Successfully deleted ${selectedItems.length} item(s)`,
          severity: 'success'
        });
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to delete items',
          severity: 'error'
        });
      }
    } catch (err: any) {
      console.error('🔴 Delete error:', err);
      setSnackbar({
        open: true,
        message: 'Failed to delete items. Please try again.',
        severity: 'error'
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Cancel selection mode
  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedItems([]);
  };

  // Show snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{
      p: { xs: 1, sm: 2, md: 3 },
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      minWidth: 0,
      overflow: 'hidden',
      background: 'white',
    }}>
      {/* Header with Back Button and Edit/Delete Toggle */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: { xs: 2, md: 3 },
        flexShrink: 0,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              mr: 2,
              color: 'rgba(14, 97, 192, 1)',
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              fontWeight: 600,
              color: 'rgba(14, 97, 192, 1)',
              fontSize: {
                xs: '1.5rem',
                sm: '1.75rem',
                md: '2rem'
              },
            }}
          >
            {isSelectionMode ? `Delete Selected (${selectedItems.length})` : 'History'}
          </Typography>
        </Box>

        {/* Edit/Delete Selection Button */}
        {!isSelectionMode ? (
          <Button
            startIcon={<EditIcon />}
            onClick={() => setIsSelectionMode(true)}
            sx={{
              color: 'rgba(14, 97, 192, 1)',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(14, 97, 192, 0.04)',
              }
            }}
          >
            Edit
          </Button>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            {/* Delete Button with Custom Icon */}
            <Button
              startIcon={
                <img
                  src={DeleteSelect}
                  alt="Delete"
                  style={{ width: 20, height: 20 }}
                />
              }
              onClick={handleDeleteSelected}
              disabled={selectedItems.length === 0 || deleteLoading}
              sx={{
                color: selectedItems.length === 0 ? 'text.disabled' : '#d32f2f',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor:
                    selectedItems.length > 0
                      ? 'rgba(211, 47, 47, 0.04)'
                      : undefined,
                }
              }}
            >
             
            </Button>

            {/* Cancel Button with Custom Icon */}
            <Button
              onClick={handleCancelSelection}
              startIcon={
                <img
                  src={CrossSelect}
                  alt="Cancel"
                  style={{ width: 20, height: 20 }}
                />
              }
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
            </Button>
          </Box>
        )}
      </Box>

      {/* History List */}
      <Box sx={{
        flex: 1,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f5f9',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#cbd5e1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#94a3b8',
        }
      }}>
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={40} sx={{ color: 'rgba(14, 97, 192, 1)' }} />
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* History Items */}
        {!loading && historyItems.map((item, index) => (
          <Box key={item.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
            {isSelectionMode && (
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
                sx={{
                  position: 'relative',
                  top: 8,
                  left: 8,
                }}
              />
            )}
            <HistoryCard
              item={item}
              showModal={!isSelectionMode}
              index={index}
              onReportUpdate={handleReportUpdate} // ADD THIS PROP
            />
          </Box>
        ))}

        {/* Empty State */}
        {!loading && !error && historyItems.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No History Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Start a new case to see your reports here.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#f44336',
          }
        }}
      />
    </Box>
  );
};

export default History;