import React, { useCallback, useState } from 'react';
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

// Add flow context type
type OTPFlowContext = 'signup' | 'forgot-password';

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ 
  currentScreen, 
  navigate, 
  onLogin 
}) => {
  // Track where the user is coming from for OTP
  const [otpFlowContext, setOtpFlowContext] = useState<OTPFlowContext>('signup');

  const handleLoginSubmit = useCallback((data: LoginFormData) => {
    console.log('Login data:', data);
    onLogin();
  }, [onLogin]);

  const handleSignUpSubmit = useCallback((data: SignUpFormData) => {
    console.log('SignUp data:', data);
    setOtpFlowContext('signup'); // Set context before navigation
    navigate('signup-step2');
  }, [navigate]);

  const handleOnboardingSubmit = useCallback((data: OnboardingFormData) => {
    console.log('Onboarding data:', data);
    setOtpFlowContext('signup'); // Maintain signup context
    navigate('verification');
  }, [navigate]);

  // Add handler for forgot password flow
  const handleForgotPasswordSubmit = useCallback(() => {
    setOtpFlowContext('forgot-password'); // Set context before navigation
    navigate('verification');
  }, [navigate]);

  const handleOTPVerificationSuccess = useCallback(() => {
    // Route based on flow context
    if (otpFlowContext === 'signup') {
      onLogin(); // Go to home after signup OTP verification
    } else {
      navigate('create-password'); // Go to create password after forgot password OTP
    }
  }, [otpFlowContext, onLogin, navigate]);

  // Create a wrapper function that accepts string
  const handleNavigate = useCallback((screen: string) => {
    navigate(screen as AuthScreen);
  }, [navigate]);

  const renderScreen = useCallback(() => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginForm
            onNavigate={handleNavigate}
            onSubmit={handleLoginSubmit}
          />
        );
      case 'signup':
        return (
          <SignUpForm
            onNavigate={handleNavigate}
            onSubmit={handleSignUpSubmit}
          />
        );
      case 'signup-step2':
        return (
          <SignUpStep2Form
            onNavigate={handleNavigate}
            onSubmit={handleOnboardingSubmit}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm 
            onNavigate={handleNavigate}
            onSubmit={handleForgotPasswordSubmit} // Add this prop
          />
        );
      case 'verification':
        return (
          <OTPVerification 
            onNavigate={handleNavigate}
            onSuccess={handleOTPVerificationSuccess}
            flowContext={otpFlowContext} // Pass the context
          />
        );
      case 'create-password':
        return <NewPasswordFrom onNavigate={handleNavigate} />;
      default:
        return (
          <LoginForm
            onNavigate={handleNavigate}
            onSubmit={handleLoginSubmit}
          />
        );
    }
  }, [
    currentScreen, 
    handleNavigate, 
    handleLoginSubmit, 
    handleSignUpSubmit, 
    handleOnboardingSubmit,
    handleOTPVerificationSuccess,
    handleForgotPasswordSubmit, // Add this
    otpFlowContext // Add this
  ]);

  return <AuthLayout>{renderScreen()}</AuthLayout>;
};

export default AuthNavigator;