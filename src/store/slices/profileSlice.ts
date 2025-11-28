import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id: string;
  email: string;
  userName: string;
  role: string;
  agencyType: string;
  phoneNumber: string;
  softwareName: string;
}

export interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Set loading state
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Set profile data
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // Update profile
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },

    // Clear profile
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
});

export const {
  setProfileLoading,
  setProfileError,
  setProfile,
  updateProfile,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;