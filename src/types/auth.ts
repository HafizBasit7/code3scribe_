export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface OnboardingFormData {
  softwareName: string;
  role: string;
  agencyType: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export interface VerificationCodeData {
  code: string[];
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export type AuthScreen = 
  | 'login' 
  | 'signup' 
  | 'signup-step2' 
  | 'forgot-password' 
  | 'verification' 
  | 'create-password' 
  | 'home';