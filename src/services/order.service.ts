// // import { apiClient } from './api';
// // import axios from 'axios';
// // import { Order, OrderCreate, UploadUrlResponse, ConfirmUploadRequest } from '@/types/order.types';

// // export const orderService = {
// //   create: async (data: OrderCreate): Promise<Order> => {
// //     const response = await apiClient.post('/order/', data);
// //     return response.data;
// //   },

// //   getAll: async (): Promise<Order[]> => {
// //     const response = await apiClient.get('/order/');
// //     return response.data;
// //   },

// //   getMyOrders: async (): Promise<Order[]> => {
// //     const response = await apiClient.get('/order/me');
// //     return response.data;
// //   },

// //   getMyOrderById: async (id: string): Promise<Order> => {
// //     const response = await apiClient.get(`/order/me/${id}`);
// //     return response.data;
// //   },

// //   getById: async (id: string): Promise<Order> => {
// //     const response = await apiClient.get(`/order/${id}`);
// //     return response.data;
// //   },

// //   update: async (id: string, data: Partial<OrderCreate>): Promise<Order> => {
// //     const response = await apiClient.put(`/order/${id}`, data);
// //     return response.data;
// //   },

// //   delete: async (id: string): Promise<void> => {
// //     await apiClient.delete(`/order/${id}`);
// //   },

// //   getUploadUrl: async (orderId: string): Promise<UploadUrlResponse> => {
// //     const response = await apiClient.get(`/order/${orderId}/generate-upload-url`);
// //     return response.data;
// //   },

// //   uploadImage: async (url: string, file: File): Promise<void> => {
// //     await axios.put(url, file, {
// //       headers: {
// //         'Content-Type': file.type,
// //       },
// //     });
// //   },

// //   confirmUpload: async (orderId: string, data: ConfirmUploadRequest): Promise<any> => {
// //     const response = await apiClient.post(`/order/${orderId}/confirm-upload`, data);
// //     return response.data;
// //   },
// // };



// import { apiClient } from './api';
// import axios from 'axios';
// import { Order, OrderCreate, UploadUrlResponse, ImageUploadConfirmation, OrderImage } from '@/types/order.types';

// export const orderService = {
//   create: async (data: OrderCreate): Promise<Order> => {
//     const response = await apiClient.post('/order/', data);
//     return response.data;
//   },

//   getAll: async (): Promise<Order[]> => {
//     const response = await apiClient.get('/order/');
//     return response.data;
//   },

//   getMyOrders: async (): Promise<Order[]> => {
//     const response = await apiClient.get('/order/me');
//     return response.data;
//   },

//   getMyOrderById: async (id: string): Promise<Order> => {
//     const response = await apiClient.get(`/order/me/${id}`);
//     return response.data;
//   },

//   getById: async (id: string): Promise<Order> => {
//     const response = await apiClient.get(`/order/${id}`);
//     return response.data;
//   },

//   update: async (id: string, data: Partial<OrderCreate>): Promise<Order> => {
//     const response = await apiClient.put(`/order/${id}`, data);
//     return response.data;
//   },

//   delete: async (id: string): Promise<void> => {
//     await apiClient.delete(`/order/${id}`);
//   },

//   getUploadUrl: async (orderId: string, fileExtension?: string, contentType?: string): Promise<UploadUrlResponse> => {
//     const params = new URLSearchParams();
//     if (fileExtension) params.append('file_extension', fileExtension);
//     if (contentType) params.append('content_type', contentType);
    
//     // const response = await apiClient.get(`/order/${orderId}/generate-upload-url?${params.toString()}`);
//     // return response.data;
//     const response = await apiClient.get(`/order/${orderId}/generate-upload-url`);
//     return response.data;
//   },

//   uploadImage: async (url: string, file: File): Promise<void> => {
//     await axios.put(url, file, {
//       headers: {
//         'Content-Type': file.type,
//       },
//     });
//   },

//   confirmUpload: async (orderId: string, data: ImageUploadConfirmation): Promise<OrderImage> => {
//     const response = await apiClient.post(`/order/${orderId}/confirm-upload`, data);
//     return response.data;
//   },
// };






// 222222222222222222222222222222222222222222222222

import { apiClient } from './api';
import axios from 'axios';
import { Order, OrderCreate, UploadUrlResponse, ImageUploadConfirmation, OrderImage } from '@/types/order.types';

export const orderService = {
  create: async (data: OrderCreate): Promise<Order> => {
    const response = await apiClient.post('/order/', data);
    return response.data;
  },

  getAll: async (): Promise<Order[]> => {
    const response = await apiClient.get('/order/');
    return response.data;
  },

  getMyOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get('/order/me');
    return response.data;
  },

  getMyOrderById: async (id: string): Promise<Order> => {
    const response = await apiClient.get(`/order/me/${id}`);
    return response.data;
  },

  getById: async (id: string): Promise<Order> => {
    const response = await apiClient.get(`/order/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<OrderCreate>): Promise<Order> => {
    const response = await apiClient.put(`/order/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/order/${id}`);
  },

  // NEW: Get order images (you'll need to add this endpoint to backend)
  // getOrderImages: async (orderId: string): Promise<OrderImage[]> => {
  // //   const response = await apiClient.get(`/order/${orderId}/images`);
  // //   return response.data;
  // // },

  getUploadUrl: async (orderId: string, fileExtension?: string, contentType?: string): Promise<UploadUrlResponse> => {
    const params = new URLSearchParams();
    if (fileExtension) params.append('file_extension', fileExtension);
    if (contentType) params.append('content_type', contentType);
    
    const response = await apiClient.get(`/order/${orderId}/generate-upload-url?${params.toString()}`);
    return response.data;
  },

  // uploadImage: async (url: string, file: File): Promise<void> => {
  //   await axios.put(url, file, {
  //     headers: {
  //       'Content-Type': file.type,
  //     },
  //   });
  // },

  confirmUpload: async (orderId: string, data: ImageUploadConfirmation): Promise<OrderImage> => {
    const response = await apiClient.post(`/order/${orderId}/confirm-upload`, data);
    return response.data;
  },
  // Upload image (client)
  uploadImageDirect: async (
    orderId: string, 
    file: File, 
    imageType: 'before' | 'after' | 'reference' | 'instruction'
  ): Promise<OrderImage> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('image_type', imageType);

    const response = await apiClient.post(
      `/order/${orderId}/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Upload image (admin)
  adminUploadImage: async (
    orderId: string, 
    file: File, 
    imageType: 'before' | 'after' | 'reference' | 'instruction'
  ): Promise<OrderImage> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('image_type', imageType);

    const response = await apiClient.post(
      `/order/${orderId}/admin-upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Get order images
  getOrderImages: async (orderId: string): Promise<OrderImage[]> => {
    const response = await apiClient.get(`/order/${orderId}/images`);
    return response.data;
  },

  // Delete image
  deleteImage: async (imageId: string): Promise<void> => {
    await apiClient.delete(`/order/images/${imageId}`);
  },

  // Get all images (admin)
  getAllImages: async (): Promise<OrderImage[]> => {
    const response = await apiClient.get('/order/admin/all-images');
    return response.data;
  },

  // ... inside orderService object
  
  // Helper to get the actual view URL for the image stream
  getImageUrl: (orderId: string, imageId: string): string => {
    // Assuming apiClient.defaults.baseURL is something like 'http://api.example.com/v1'
    const baseUrl = apiClient.defaults.baseURL || '';
    return `${baseUrl}/order/${orderId}/image/${imageId}/view`;
  },


// ...
};