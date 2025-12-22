export interface User {
  password: string;
  address: string;
  user_type: 'admin' | 'client';
  first_name: string;
  last_name:string;
  id: string;
  email: string;
  full_name: string;
  // role: 'admin' | 'client';
  created_at?: string;
  phone:string;
}

export interface UserUpdate {
  first_name:string;
  last_name:string;
  phone:string;
  address:string;
  password:string;
}