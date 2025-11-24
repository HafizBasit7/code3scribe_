export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  children?: MenuItem[];
}

export type AuthScreen = 'login' | 'register' | 'main';