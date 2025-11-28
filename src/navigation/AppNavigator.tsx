// navigators/AppNavigator.tsx
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import type { AuthScreen } from '../types/auth';
import { logout } from '../store/slices/authSlice';
import { 
  selectIsAuthenticated, 
  selectUser, 
  selectIsLoading 
} from '../store/selectors/authSelectors';
import { logoutUser } from '../services/authApi';

interface ScreenState {
  screen: AuthScreen;
  params?: any;
}

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const [currentScreen, setCurrentScreen] = useState<ScreenState>({ screen: 'login' });

  // Add debug logs
  console.log('🔵 AppNavigator - isAuthenticated:', isAuthenticated);
  console.log('🔵 AppNavigator - current path:', location.pathname);

  const handleNavigate = useCallback((screen: AuthScreen, params?: any) => {
    console.log('🟡 Navigating to:', screen);
    setCurrentScreen({ screen, params });
  }, []);

  const handleLogin = useCallback((userData: any) => {
    console.log('🟢 Login successful, user authenticated');
    // No need to navigate manually - the route change will happen automatically
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (user && refreshToken) {
        await logoutUser({
          userid: user.userId,
          deviceType: 1,
          userDeviceToken: '',
          refreshToken: refreshToken,
        });
        console.log('Logout API call successful');
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      dispatch(logout());
      setCurrentScreen({ screen: 'login' });
    }
  }, [dispatch, user]);

  // Prevent unnecessary re-renders by using stable route components
  const renderAuthRoutes = useCallback(() => (
    <AuthNavigator 
      currentScreen={currentScreen.screen}
      screenParams={currentScreen.params}
      navigate={handleNavigate}
      onLogin={handleLogin}
    />
  ), [currentScreen.screen, currentScreen.params, handleNavigate, handleLogin]);

  const renderMainRoutes = useCallback(() => (
    <MainNavigator onLogout={handleLogout} />
  ), [handleLogout]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth routes - only accessible when NOT authenticated */}
      {!isAuthenticated ? (
        <Route path="/*" element={renderAuthRoutes()} />
      ) : (
        /* Protected routes - only accessible when authenticated */
        <Route path="/*" element={renderMainRoutes()} />
      )}
      
      {/* Redirect from /login to home if already authenticated */}
      {isAuthenticated && (
        <Route path="/login" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default AppNavigator;