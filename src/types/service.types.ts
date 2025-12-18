export interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  estimated_days: number;
  created_at?: string;
  category:string;
  isActive:boolean
}

export interface ServiceCreate {
  name: string;
  description: string;
  base_price: number;
  estimated_days: number;
  category:string
  isActive:boolean
}