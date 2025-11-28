import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  userId: string;
  userName: string;
  softwareName: string;
  email: string; 
  phoneNumber?: string;
  role?: string;
  agencyType?: string;
  subscriptionStatus?: 'active' | 'pending' | 'inactive';
  subscriptionMessage?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Get initial state from localStorage
// slices/authSlice.ts
// Update the getInitialState function:

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const softwareName = localStorage.getItem('softwareName');
  
  // Reconstruct user object from localStorage if tokens exist
  let user: User | null = null;
  
  if (token && userId) {
    user = {
      userId: userId,
      userName: userName || '',
      email: userEmail || '',
      softwareName: softwareName || '',
      // Optional fields can remain undefined
      phoneNumber: undefined,
      role: undefined,
      agencyType: undefined,
    };
  }

  return {
    user: user,
    token: token,
    refreshToken: refreshToken,
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Login success
  loginSuccess: (state, action: PayloadAction<{
  user: User;
  token: string;
  refreshToken: string;
}>) => {
  state.isLoading = false;
  state.isAuthenticated = true;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.refreshToken = action.payload.refreshToken;
  state.error = null;

  // Store ALL user data in localStorage
  localStorage.setItem('token', action.payload.token);
  localStorage.setItem('refreshToken', action.payload.refreshToken);
  localStorage.setItem('userId', action.payload.user.userId);
  localStorage.setItem('userName', action.payload.user.userName);
  localStorage.setItem('userEmail', action.payload.user.email || '');
  localStorage.setItem('softwareName', action.payload.user.softwareName);
},

    // Register success (same as login since we auto-login after registration)
    registerSuccess: (state, action: PayloadAction<{
      user: User;
      token: string;
      refreshToken: string;
    }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;

      // Store in localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('userId', action.payload.user.userId);
    },

    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.error = null;

    
      // Clear ALL localStorage items
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('softwareName');
  localStorage.removeItem('userData');
  localStorage.removeItem('loginTimestamp');
    },

    // Update user profile
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  setLoading,
  setError,
  loginSuccess,
  registerSuccess,
  logout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;