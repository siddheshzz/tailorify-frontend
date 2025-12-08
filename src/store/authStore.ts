import { create } from 'zustand';
import { DecodedToken } from '@/types/auth.types';
import { storage } from '@/utils/storage';
import { decodeToken, isTokenExpired } from '@/utils/jwt';
import { authService } from '@/services/auth.service';

interface AuthState {
  token: string | null;
  user: DecodedToken | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,

  setToken: (token: string) => {
    const decoded = decodeToken(token);
    if (decoded && !isTokenExpired(token)) {
      storage.setToken(token);
      set({
        token,
        user: decoded,
        isAuthenticated: true,
        isAdmin: decoded.role === 'admin',
      });
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      storage.removeToken();
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isAdmin: false,
      });
    }
  },

  initialize: () => {
    const token = storage.getToken();
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      if (decoded) {
        set({
          token,
          user: decoded,
          isAuthenticated: true,
          isAdmin: decoded.role === 'admin',
        });
      } else {
        storage.removeToken();
      }
    } else {
      storage.removeToken();
    }
  },
}));