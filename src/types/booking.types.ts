export interface Booking {
  id: string;
  service_id: string;
  client_id: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  created_at?: string;
}

export interface BookingCreate {
  service_id: string;
  appointment_time: string;
  notes?: string;
}