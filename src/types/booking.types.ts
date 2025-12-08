export interface Booking {
  id: string;
  service_id: string;
  client_id: string;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  created_at?: string;
}

export interface BookingCreate {
  service_id: string;
  booking_date: string;
  notes?: string;
}