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
  isInitializing: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isInitializing:true,

  setToken: (token: string) => {
    console.log("**********");
    console.log("**********");
    console.log(token);
    console.log("**********");
    console.log("**********");
    const decoded = decodeToken(token);
    console.log("**********");
    console.log("**********");
    console.log(decoded);
    console.log("**********");
    console.log("**********");
    console.log(isTokenExpired(token))
    if (decoded && !isTokenExpired(token)) {
      storage.setToken(token);
      set({
        token,
        user: decoded,
        isAuthenticated: true,
        isAdmin: decoded.user_type === 'admin',
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
    console.log("AUTH INITIALIZE CALLED");
    const token = storage.getToken();

    console.log('Initialize - Token from storage:', !!token);
    if (token) {

      const decoded = decodeToken(token)
      const expired = isTokenExpired(token)

      // console.log('Initialize - Decoded:', !!decoded);
      //   console.log('Initialize - Expired:', expired);
      // const decoded = decodeToken(token);
      if (decoded && !expired) {
        set({
          token,
          user: decoded,
          isAuthenticated: true,
          isAdmin: decoded.user_type === 'admin',
          isInitializing:false
        });
        console.log('Initialize - SUCCESS: State is being set.');
      } else {
        console.log('Initialize - FAILURE: Token invalid or expired.');
        storage.removeToken();
        set({
        isInitializing: false, // <-- Set to false if token decode fails
      });

      }
    } else {
      console.log('Initialize - FAILURE: No token found in storage.');
      storage.removeToken();
      set({
        isInitializing: false, // <-- Set to false if token decode fails
      });
    }
  },
}));