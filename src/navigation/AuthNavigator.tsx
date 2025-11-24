import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import SignUpStep2Form from '../components/auth/SignUpStep2Form';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import OTPVerification from '../components/auth/OTPVerification';
import NewPasswordFrom from '../components/auth/NewPasswordForm';
import type { 
  AuthScreen, 
  LoginFormData, 
  SignUpFormData, 
  OnboardingFormData 
} from '../types/auth';

interface AuthNavigatorProps {
  currentScreen: AuthScreen;
  navigate: (screen: AuthScreen) => void;
  onLogin: () => void;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ 
  currentScreen, 
  navigate, 
  onLogin 
}) => {
  const handleLoginSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
    onLogin();
  };

  const handleSignUpSubmit = (data: SignUpFormData) => {
    console.log('SignUp data:', data);
    navigate('signup-step2');
  };

  const handleOnboardingSubmit = (data: OnboardingFormData) => {
    console.log('Onboarding data:', data);
    onLogin();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginForm
            onNavigate={navigate}
            onSubmit={handleLoginSubmit}
          />
        );
      case 'signup':
        return (
          <SignUpForm
            onNavigate={navigate}
            onSubmit={handleSignUpSubmit}
          />
        );
      case 'signup-step2':
        return (
          <SignUpStep2Form
            onNavigate={navigate}
            onSubmit={handleOnboardingSubmit}
          />
        );
      case 'forgot-password':
        return <ForgotPasswordForm onNavigate={navigate} />;
      case 'verification':
        return <OTPVerification onNavigate={navigate} />;
      case 'create-password':
        return <NewPasswordFrom onNavigate={navigate} />;
      default:
        return (
          <LoginForm
            onNavigate={navigate}
            onSubmit={handleLoginSubmit}
          />
        );
    }
  };

  return <AuthLayout>{renderScreen()}</AuthLayout>;
};

export default AuthNavigator;