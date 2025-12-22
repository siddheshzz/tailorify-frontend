import { apiClient } from './api';
import { User, UserUpdate } from '@/types/user.types';

export const userService = {
  getAll: async (): Promise<User[]> => {
      const response = await apiClient.get('/user');
      return response.data;
    },


  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/user/me');
    return response.data;
  },

  create: async (data: User): Promise<User> => {
      const response = await apiClient.post('/user/', data);
      return response.data;
    },

      update: async (id: string, data: UserUpdate): Promise<User> => {
        const response = await apiClient.put(`/user/${id}`, data);
        return response.data;
      },

  updateMe: async ( data: UserUpdate): Promise<User> => {
    const response = await apiClient.put(`/user/me`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/user/${id}`);
  },
};