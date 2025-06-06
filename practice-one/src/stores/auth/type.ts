// Interfaces
import { User } from '@/interfaces';

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

export interface AuthStore extends AuthState {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}
