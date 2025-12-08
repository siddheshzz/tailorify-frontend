export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'client';
  created_at?: string;
}

export interface UserUpdate {
  full_name?: string;
  email?: string;
}