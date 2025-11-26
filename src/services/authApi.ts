import { LoginFormData, SignUpFormData, OnboardingFormData } from '../types/auth';

const API_BASE_URL = 'https://code3scribe.net/api';

// Common headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'accept': '*/*',
});

// Send OTP for verification
export const sendVerificationCode = async (phoneNumber: string, email: string) => {
  const response = await fetch(`${API_BASE_URL}/SMS/SendVerificationCode`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ phoneNumber, email }),
  });
  
  if (!response.ok) throw new Error('Failed to send verification code');
  return response.json();
};

// Verify OTP code
export const verifyCode = async (phoneNumber: string, code: string) => {
  const response = await fetch(`${API_BASE_URL}/SMS/VerifyCode`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ phoneNumber, code }),
  });
  
  if (!response.ok) throw new Error('Failed to verify code');
  return response.text(); // Returns "Verified" as text
};

// User registration
export const registerUser = async (userData: {
  userName: string;
  email: string;
  password: string;
  conformPassword: string;
  softwareName: string;
  role: string;
  agencyType: string;
  phoneNumber: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/UserLogin/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) throw new Error('Failed to register user');
  return response.json();
};

// User login
export const loginUser = async (loginData: {
  email: string;
  password: string;
  deviceId?: number;
  userDeviceToken?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/UserLogin/Login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      ...loginData,
      deviceId: loginData.deviceId || 1,
      userDeviceToken: loginData.userDeviceToken || '',
    }),
  });
  
  if (!response.ok) throw new Error('Failed to login');
  return response.json();
};

// Refresh token
export const refreshToken = async (refreshToken: string, userId: string, deviceType: number = 1) => {
  const response = await fetch(
    `${API_BASE_URL}/UserLogin/refresh-token?refreshToken=${refreshToken}&userId=${userId}&deviceType=${deviceType}`,
    {
      method: 'POST',
      headers: getHeaders(),
    }
  );
  
  if (!response.ok) throw new Error('Failed to refresh token');
  return response.json();
};

// User logout
export const logoutUser = async (logoutData: {
  userid: string;
  deviceType: number;
  userDeviceToken: string;
  refreshToken: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/UserLogin/logout`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(logoutData),
  });
  
  if (!response.ok) throw new Error('Failed to logout');
  return response.json();
};