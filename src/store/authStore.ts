import { create } from 'zustand';
import { type User } from '@/types/front.types';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setAuthState: (user: User) => void;
  clearAuthState: () => void;
}

/*
const userInit: User = {
  id: 82,
  name: 'Admin',
  surname: 'Admin',
  username: 'Admin',
  email: 'admin@admin',
  photo: 'https://vidaenusa.org/wp-content/uploads/2023/12/cuanto-gana-administrador-empresas-usa.jpg',
  verified: true,
  rating: 3,
  role: 'admin',
}
  */

export const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  user: null,
  setAuthState: (user) => set({ isLoggedIn: true, user }),
  clearAuthState: () => set({ isLoggedIn: false, user: null }),
}));
