// services/authApi.ts
import { LoginFormData, SignUpFormData, OnboardingFormData } from '../types/auth';
import axios from './axiosConfig.ts';

const API_BASE_URL = '/api';

// Send OTP for verification
export const sendVerificationCode = async (phoneNumber: string, email: string) => {
  const response = await axios.post(`${API_BASE_URL}/SMS/SendVerificationCode`, {
    phoneNumber,
    email,
  });
  return response.data;
};

// Verify OTP code
export const verifyCode = async (phoneNumber: string, code: string) => {
  const response = await axios.post(`${API_BASE_URL}/SMS/VerifyCode`, {
    phoneNumber,
    code,
  });
  return response.data; // Returns "Verified" as text
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
  const response = await axios.post(`${API_BASE_URL}/UserLogin/register`, userData);
  return response.data;
};

// User login
export const loginUser = async (loginData: {
  email: string;
  password: string;
  deviceId?: number;
  userDeviceToken?: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/UserLogin/Login`, {
    ...loginData,
    deviceId: loginData.deviceId || 1,
    userDeviceToken: loginData.userDeviceToken || '',
  });
  return response.data;
};

// Refresh token
export const refreshToken = async (refreshToken: string, userId: string, deviceType: number = 1) => {
  const response = await axios.post(
    `${API_BASE_URL}/UserLogin/refresh-token?refreshToken=${refreshToken}&userId=${userId}&deviceType=${deviceType}`
  );
  return response.data;
};

// User logout
export const logoutUser = async (logoutData: {
  userid: string;
  deviceType: number;
  userDeviceToken: string;
  refreshToken: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/UserLogin/logout`, logoutData);
  return response.data;
};