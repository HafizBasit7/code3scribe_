import React, { useState, useCallback } from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import type { AuthScreen } from '../types/auth';

const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useCallback((screen: AuthScreen) => {
    setCurrentScreen(screen);
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentScreen('home');
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  }, []);

  if (!isAuthenticated) {
    return (
      <AuthNavigator 
        currentScreen={currentScreen} 
        navigate={navigate}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <MainNavigator 
      currentScreen={currentScreen}
      navigate={navigate}
      onLogout={handleLogout}
    />
  );
};

export default AppNavigator;