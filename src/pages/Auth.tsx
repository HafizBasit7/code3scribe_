import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import OTPVerification from '../components/auth/OTPVerification';
import NewPasswordForm from '../components/auth/NewPasswordForm';
import SignUpComplete from '../components/auth/SignUpComplete';
import type { 
  LoginFormData, 
  SignUpFormData, 
  ForgotPasswordData, 
  ResetPasswordData 
} from '../types/auth';

const Auth: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState<Partial<SignUpFormData>>({});

  const handleNavigate = (authType: string) => {
    navigate(`/auth/${authType}`);
  };

  const handleLoginSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
    navigate('/home');
  };

  const handleSignUpSubmit = (data: SignUpFormData) => {
    console.log('SignUp data:', data);
    setSignUpData(data);
    navigate('/auth/signup-complete');
  };

  const handleSignUpCompleteSubmit = (data: SignUpFormData) => {
    console.log('SignUp complete data:', data);
    navigate('/home');
  };

  const handleForgotPasswordSubmit = (data: ForgotPasswordData) => {
    console.log('Forgot password data:', data);
  };

  const handleResetPasswordSubmit = (data: ResetPasswordData) => {
    console.log('Reset password data:', data);
  };

  const handleOTPVerify = () => {
    console.log('OTP verified');
  };

  const renderAuthComponent = () => {
    switch (type) {
      case 'signup':
        return (
          <SignUpForm
            onNavigate={handleNavigate}
            onSubmit={handleSignUpSubmit}
          />
        );
      case 'signup-complete':
        return (
          <SignUpComplete
            onNavigate={handleNavigate}
            onSubmit={handleSignUpCompleteSubmit}
            initialData={signUpData}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onNavigate={handleNavigate}
            onSubmit={handleForgotPasswordSubmit}
          />
        );
      case 'otp':
        return (
          <OTPVerification
            onNavigate={handleNavigate}
            onVerify={handleOTPVerify}
          />
        );
      case 'new-password':
        return (
          <NewPasswordForm
            onNavigate={handleNavigate}
            onSubmit={handleResetPasswordSubmit}
          />
        );
      case 'login':
      default:
        return (
          <LoginForm
            onNavigate={handleNavigate}
            onSubmit={handleLoginSubmit}
          />
        );
    }
  };

  return (
    <AuthLayout rightContent={renderAuthComponent()}>
      {renderAuthComponent()}
    </AuthLayout>
  );
};

export default Auth;