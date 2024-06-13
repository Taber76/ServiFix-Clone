import { create } from 'zustand';
import { type User } from '@/types/front.types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuthState: (user: User) => void;
  clearAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuthState: (user: User) => set({ isAuthenticated: true, user }),
  clearAuthState: () => set({ isAuthenticated: false, user: null }),
}));
