import { apiClient } from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth.types';

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/user/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/user/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/user/logout');
  },
};