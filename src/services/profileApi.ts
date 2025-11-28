import axios from './axiosConfig';

const API_BASE_URL = '/api';

// Get user profile by ID
export const getUserProfile = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/Profile/${userId}`);
  return response.data;
};


// Delete user account
export const deleteUserAccount = async (userId: string) => {
  const response = await axios.post(`${API_BASE_URL}/Profile/delete/${userId}`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userId: string, profileData: {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  agencyType?: string;
}) => {
  const response = await axios.put(`${API_BASE_URL}/Profile/${userId}`, profileData);
  return response.data;
};