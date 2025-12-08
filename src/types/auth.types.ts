export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  role?: 'client' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface DecodedToken {
  user_id: string;
  email: string;
  role: 'admin' | 'client';
  full_name?: string;
  exp: number;
}