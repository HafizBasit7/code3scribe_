import { RootState } from '../index';

export const selectProfile = (state: RootState) => state.profile;
export const selectUserProfile = (state: RootState) => state.profile.profile;
export const selectProfileLoading = (state: RootState) => state.profile.isLoading;
export const selectProfileError = (state: RootState) => state.profile.error;