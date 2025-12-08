export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  estimated_days: number;
  created_at?: string;
}

export interface ServiceCreate {
  name: string;
  description: string;
  price: number;
  estimated_days: number;
}