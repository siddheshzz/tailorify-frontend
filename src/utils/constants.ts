export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const ORDER_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SERVICES: '/services',
  SERVICE_DETAIL: '/services/:id',
  CREATE_ORDER: '/orders/create',
  MY_ORDERS: '/orders/me',
  ORDER_DETAIL: '/orders/:id',
  BOOKINGS: '/bookings',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_SERVICES: '/admin/services',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_USERS: '/admin/users',
} as const;