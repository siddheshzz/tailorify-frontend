import { apiClient } from './api';
import { User, UserUpdate } from '@/types/user.types';

export const userService = {
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/user/me');
    return response.data;
  },

  updateMe: async (id: string, data: UserUpdate): Promise<User> => {
    const response = await apiClient.put(`/user/me/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/user/${id}`);
  },
};