export interface Order {
  id: string;
  service_id: string;
  client_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at?: string;
  image_url?: string;
  s3_object_path?: string;
}

export interface OrderCreate {
  service_id: string;
  notes?: string;
}

export interface UploadUrlResponse {
  url: string;
  s3_object_path: string;
}

export interface ConfirmUploadRequest {
  s3_object_path: string;
}