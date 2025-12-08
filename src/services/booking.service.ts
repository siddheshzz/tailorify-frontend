import { apiClient } from './api';
import { Booking, BookingCreate } from '@/types/booking.types';

export const bookingService = {
  getAll: async (): Promise<Booking[]> => {
    const response = await apiClient.get('/booking/');
    return response.data;
  },

  create: async (data: BookingCreate): Promise<Booking> => {
    const response = await apiClient.post('/booking/', data);
    return response.data;
  },
};