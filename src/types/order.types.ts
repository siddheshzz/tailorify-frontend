// export interface Order {
//   id: string;
//   service_id: string;
//   client_id: string;
//   status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
//   notes?: string;
//   created_at: string;
//   updated_at?: string;
//   image_url?: string;
//   s3_object_path?: string;
// }

// export interface OrderCreate {
//   service_id: string;
//   notes?: string;
// }

// export interface UploadUrlResponse {
//   url: string;
//   s3_object_path: string;
// }

// export interface ConfirmUploadRequest {
//   s3_object_path: string;
// }


export interface Order {
  id: string;
  client_id: string;
  service_id: string;
  status: 'pending' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
  description: string;
  requested_date: string;
  estimated_completion: string;
  actual_completion?: string;
  quoted_price: number;
  actual_price?: number;
  notes?: string;
  priority?: 'normal' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
}

export interface OrderCreate {
  client_id: string;
  service_id: string;
  description: string;
  quoted_price?: number;
  actual_price?: number;
  notes?: string;
  priority?: 'normal' | 'high' | 'urgent';
  status?: 'pending' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
}

export interface UploadUrlResponse {
  url: string;
  s3_object_path: string;
}

export interface ImageUploadConfirmation {
  s3_object_path: string;
  uploaded_by: string;
  image_type: 'before' | 'after' | 'reference' | 'instruction';
}

export interface OrderImage {
  id: string;
  order_id: string;
  uploaded_by: string;
  s3_url: string;
  image_type: 'before' | 'after' | 'reference' | 'instruction';
  uploaded_at: string;
}