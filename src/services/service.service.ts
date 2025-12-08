import { apiClient } from './api';
import { Service, ServiceCreate } from '@/types/service.types';

export const serviceService = {
  getAll: async (): Promise<Service[]> => {
    const response = await apiClient.get('/service/');
    return response.data;
  },

  getById: async (id: string): Promise<Service> => {
    const response = await apiClient.get(`/service/${id}`);
    return response.data;
  },

  create: async (data: ServiceCreate): Promise<Service> => {
    const response = await apiClient.post('/service/', data);
    return response.data;
  },

  update: async (id: string, data: ServiceCreate): Promise<Service> => {
    const response = await apiClient.put(`/service/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/service/${id}`);
  },
};