import { RootState } from '../index';

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectUserId = (state: RootState) => state.auth.user?.userId;
export const selectUserName = (state: RootState) => state.auth.user?.userName;
export const selectUserEmail = (state: RootState) => state.auth.user?.email;
export const selectSoftwareName = (state: RootState) => state.auth.user?.softwareName;
export const selectRefreshTokenFromStorage = () => localStorage.getItem('refreshToken');