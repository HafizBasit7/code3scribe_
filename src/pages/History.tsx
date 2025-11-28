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
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId, selectToken } from '../store/selectors/authSelectors';
import { getUserResponseHistory, UserResponseHistory } from '../services/aiApi';
import HistoryCard from '../components/HistoryCard/HistoryCard';

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
      {/* Header with Back Button */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: { xs: 2, md: 3 },
        flexShrink: 0,
      }}>
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
          History
        </Typography>
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

        {/* History Items - Using enhanced HistoryCard component */}
        {!loading && historyItems.map((item, index) => (
          <HistoryCard
            key={item.id}
            item={item}
            showModal={true} // Enable modal on History page
            index={index}
          />
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
    </Box>
  );
};

export default History;