// navigators/AuthNavigator.tsx
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import SignUpStep2Form from '../components/auth/SignUpStep2Form';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import OTPVerification from '../components/auth/OTPVerification';
import NewPasswordFrom from '../components/auth/NewPasswordForm';
import { loginUser, registerUser, sendVerificationCode, verifyCode } from '../services/authApi';
import { initializeSubscription } from '../services/billingApi'; // Import the billing API
import { setLoading, setError, loginSuccess, registerSuccess } from '../store/slices/authSlice';
import { selectIsLoading } from '../store/selectors/authSelectors';
import type { 
  AuthScreen, 
  LoginFormData, 
  SignUpFormData, 
  OnboardingFormData 
} from '../types/auth';

interface AuthNavigatorProps {
  currentScreen: AuthScreen;
  screenParams?: any;
  navigate: (screen: AuthScreen, params?: any) => void;
  onLogin: (userData: any) => void;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ 
  currentScreen, 
  screenParams,
  navigate, 
  onLogin 
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleLoginSubmit = useCallback(async (data: LoginFormData) => {
    try {
      console.log('🟡 Starting login process for:', data.email);
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      console.log('🟢 Login API success for:', data.email);

      const userData = {
        user: {
          userId: response.userId,
          userName: response.userName,
          email: data.email,
          softwareName: response.softwareName,
        },
        token: response.token,
        refreshToken: response.refreshToken,
      };

      console.log('🟢 Dispatching loginSuccess...');
      dispatch(loginSuccess(userData));
      
      console.log('🟢 Calling onLogin callback...');
      onLogin(userData);
      
    } catch (error: any) {
      console.log('🔴 Login failed for:', data.email, error);
      
      // Wait a bit to ensure the error is properly displayed
      await new Promise(resolve => setTimeout(resolve, 50));
      
      let errorMessage = 'Login failed';
      
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.response?.status === 404) {
        errorMessage = 'User not found. Please check your email or sign up.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid request. Please check your input.';
      } else if (error.message?.includes('Network Error')) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      }
      
      console.log('🔴 Setting error message:', errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      console.log('🟡 Setting loading to false');
      dispatch(setLoading(false));
    }
  }, [dispatch, onLogin]);

  const handleSignUpSubmit = useCallback((data: SignUpFormData) => {
    console.log('SignUp form submitted with phone:', data.phoneNumber);
    // Store user data for step 2
    setUserData(data);
    navigate('signup-step2');
  }, [navigate]);

  const handleOnboardingSubmit = useCallback(async (onboardingData: OnboardingFormData) => {
    try {
      dispatch(setLoading(true));
      
      if (!userData) {
        throw new Error('User data not found. Please start over.');
      }

      // Combine user data from both forms
      const completeUserData = {
        ...userData,
        ...onboardingData,
        userName: `${userData.firstName} ${userData.lastName}`.trim(),
        conformPassword: userData.password,
      };

      console.log('Sending OTP to:', userData.phoneNumber, userData.email);
      
      // Send OTP first
      const otpResponse = await sendVerificationCode(
        userData.phoneNumber, 
        userData.email
      );
      
      if (otpResponse.success) {
        // Store complete user data for registration
        setUserData(completeUserData);
        
        // Navigate to verification with phone number as parameter
        navigate('verification', { 
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          userData: completeUserData 
        });
      } else {
        throw new Error(otpResponse.message || 'Failed to send OTP');
      }
    } catch (error: any) {
      console.error('OTP sending failed:', error);
      dispatch(setError(error.message || 'Failed to send verification code'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [userData, navigate, dispatch]);

  const handleForgotPasswordSubmit = useCallback(async (email: string) => {
    try {
      dispatch(setLoading(true));
      throw new Error('Password reset is currently unavailable. Please contact support.');
    } catch (error: any) {
      console.error('Forgot password failed:', error);
      dispatch(setError(error.message || 'Failed to process password reset request'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // NEW: Function to initialize subscription after successful registration
  const initializeUserSubscription = async (userId: string, authToken: string) => {
    try {
      console.log('🟡 Starting subscription initialization for user:', userId);
      
      const subscriptionResponse = await initializeSubscription(
        {
          userId: userId,
          plan: 1 // Using plan 1 as shown in the API example
        },
        authToken
      );

      console.log('🟢 Subscription initialization result:', subscriptionResponse);

      if (subscriptionResponse.success) {
        console.log('✅ Subscription initialized successfully:', subscriptionResponse.message);
        return {
          success: true,
          message: subscriptionResponse.message
        };
      } else {
        console.warn('🟡 Subscription initialization failed:', subscriptionResponse.message);
        return {
          success: false,
          message: subscriptionResponse.message
        };
      }
    } catch (error: any) {
      console.error('🔴 Error in subscription initialization:', error);
      return {
        success: false,
        message: error.message || 'Failed to initialize subscription'
      };
    }
  };

 // navigators/AuthNavigator.tsx - Update the handleOTPVerificationSuccess function
// navigators/AuthNavigator.tsx - Update the function signature
const handleOTPVerificationSuccess = useCallback(async (code: string, phoneNumber: string, userData: any) => {
  try {
    setVerificationLoading(true);
    dispatch(setError(null));
    
    console.log('Verifying OTP for phone:', phoneNumber);
    console.log('Code:', code);
    console.log('User Data:', userData);

    if (!phoneNumber) {
      throw new Error('Phone number not available for verification');
    }

    // Step 1: Verify OTP first
    const verificationResponse = await verifyCode(phoneNumber, code);
    console.log('OTP Verification Response:', verificationResponse);

    // Check if verification was successful
    if (verificationResponse === 'Verified' || verificationResponse.success) {
      console.log('OTP verified successfully');
      
      // SIGN UP FLOW: Register user after OTP verification
      if (!userData) {
        throw new Error('User data not found for registration');
      }

      console.log('Proceeding with user registration...');
      
      const registerResponse = await registerUser({
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
        conformPassword: userData.conformPassword,
        softwareName: userData.softwareName,
        role: userData.role,
        agencyType: userData.agencyType,
        phoneNumber: userData.phoneNumber,
      });

      console.log('User registered successfully:', registerResponse);

      // Step 3: Auto-login after successful registration
      const loginResponse = await loginUser({
        email: userData.email,
        password: userData.password,
      });

      console.log('Auto-login successful:', loginResponse);

      // Create auth data with proper typing
      const authData: any = {
        user: {
          userId: loginResponse.userId,
          userName: userData.userName,
          email: userData.email,
          softwareName: userData.softwareName,
          phoneNumber: userData.phoneNumber,
          role: userData.role,
          agencyType: userData.agencyType,
        },
        token: loginResponse.token,
        refreshToken: loginResponse.refreshToken,
      };

      // Step 4: Initialize subscription after successful registration and login
      console.log('🟡 Starting subscription initialization...');
      const subscriptionResult = await initializeUserSubscription(
        loginResponse.userId,
        loginResponse.token
      );

      // Add subscription info to user data
      if (subscriptionResult.success) {
        authData.user.subscriptionStatus = 'active';
        authData.user.subscriptionMessage = subscriptionResult.message;
        console.log('✅ Subscription integrated successfully');
      } else {
        authData.user.subscriptionStatus = 'pending';
        authData.user.subscriptionMessage = subscriptionResult.message;
        console.warn('🟡 Subscription initialization failed, but user registration successful');
      }

      dispatch(registerSuccess(authData));
      onLogin(authData);
      
    } else {
      throw new Error('OTP verification failed');
    }
  } catch (error: any) {
    console.error('OTP verification/registration failed:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Verification failed';
    dispatch(setError(errorMessage));
  } finally {
    setVerificationLoading(false);
  }
}, [dispatch, onLogin]);

  const handleNavigate = useCallback((screen: string, params?: any) => {
    navigate(screen as any, params);
  }, [navigate]);

  const renderScreen = useCallback(() => {
    const commonProps = {
      onNavigate: handleNavigate,
    };

    console.log('Rendering screen:', currentScreen);

    switch (currentScreen) {
      case 'login':
        return <LoginForm {...commonProps} onSubmit={handleLoginSubmit} loading={isLoading} />;
      case 'signup':
        return <SignUpForm {...commonProps} onSubmit={handleSignUpSubmit} loading={isLoading} />;
      case 'signup-step2':
        return <SignUpStep2Form {...commonProps} onSubmit={handleOnboardingSubmit} loading={isLoading} />;
      case 'forgot-password':
        return <ForgotPasswordForm {...commonProps} onSubmit={handleForgotPasswordSubmit} loading={isLoading} />;
      case 'verification':
        // Use screenParams passed from AppNavigator
        console.log('Screen Params in AuthNavigator:', screenParams);
        return (
          <OTPVerification 
            {...commonProps}
            onSuccess={(code) => handleOTPVerificationSuccess(code, screenParams?.phoneNumber, screenParams?.userData)}
            flowContext="signup"
            userData={screenParams}
            loading={verificationLoading}
          />
        );
      case 'create-password':
        return <NewPasswordFrom {...commonProps} loading={isLoading} />;
      default:
        return <LoginForm {...commonProps} onSubmit={handleLoginSubmit} loading={isLoading} />;
    }
  }, [
    currentScreen,
    screenParams,
    handleNavigate,
    handleLoginSubmit,
    handleSignUpSubmit,
    handleOnboardingSubmit,
    handleForgotPasswordSubmit,
    handleOTPVerificationSuccess,
    isLoading,
    verificationLoading,
  ]);

  return <AuthLayout>{renderScreen()}</AuthLayout>;
};

export default AuthNavigator;