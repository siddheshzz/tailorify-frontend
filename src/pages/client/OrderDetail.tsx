// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { ClientLayout } from '@/components/layout/ClientLayout';
// // import { Card } from '@/components/common/Card';
// // import { Badge } from '@/components/common/Badge';
// // import { Button } from '@/components/common/Button';
// // import { LoadingSpinner } from '@/components/common/LoadingSpinner';
// // import { ImageUpload } from '@/components/orders/ImageUpload';
// // import { ArrowLeft, Calendar, Package } from 'lucide-react';
// // import { orderService } from '@/services/order.service';
// // import { serviceService } from '@/services/service.service';
// // import { Order } from '@/types/order.types';
// // import { Service } from '@/types/service.types';
// // import { format } from 'date-fns';
// // import toast from 'react-hot-toast';

// // export const OrderDetail: React.FC = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();
// //   const [order, setOrder] = useState<Order | null>(null);
// //   const [service, setService] = useState<Service | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (id) {
// //       loadOrderDetails(id);
// //     }
// //   }, [id]);

// //   const loadOrderDetails = async (orderId: string) => {
// //     try {
// //       const orderData = await orderService.getMyOrderById(orderId);
// //       setOrder(orderData);

// //       const serviceData = await serviceService.getById(orderData.service_id);
// //       setService(serviceData);
// //     } catch (error) {
// //       toast.error('Failed to load order details');
// //       navigate('/orders/me');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleUploadComplete = (imageUrl: string) => {
// //     setOrder((prev) => (prev ? { ...prev, image_url: imageUrl } : null));
// //   };

// //   const getStatusVariant = (status: Order['status']) => {
// //     switch (status) {
// //       case 'completed':
// //         return 'success';
// //       case 'in_progress':
// //         return 'info';
// //       case 'pending':
// //         return 'warning';
// //       case 'cancelled':
// //         return 'danger';
// //       default:
// //         return 'default';
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <ClientLayout>
// //         <LoadingSpinner size={40} className="py-20" />
// //       </ClientLayout>
// //     );
// //   }

// //   if (!order || !service) {
// //     return (
// //       <ClientLayout>
// //         <div className="text-center py-12">
// //           <p className="text-gray-500">Order not found</p>
// //           <Button onClick={() => navigate('/orders/me')} className="mt-4">
// //             Back to Orders
// //           </Button>
// //         </div>
// //       </ClientLayout>
// //     );
// //   }

// //   return (
// //     <ClientLayout>
// //       <div className="max-w-4xl mx-auto">
// //         <Button
// //           variant="secondary"
// //           size="sm"
// //           onClick={() => navigate('/orders/me')}
// //           className="mb-6"
// //         >
// //           <ArrowLeft size={16} className="mr-2" />
// //           Back to Orders
// //         </Button>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Order Details */}
// //           <div className="lg:col-span-2 space-y-6">
// //             <Card>
// //               <div className="flex items-start justify-between mb-4">
// //                 <div>
// //                   <h1 className="text-2xl font-bold text-gray-900 mb-2">
// //                     Order #{order.id.slice(0, 8)}
// //                   </h1>
// //                   <div className="flex items-center gap-2 text-sm text-gray-500">
// //                     <Calendar size={16} />
// //                     <span>Created {format(new Date(order.created_at), 'PPP')}</span>
// //                   </div>
// //                 </div>
// //                 <Badge variant={getStatusVariant(order.status)}>
// //                   {order.status.replace('_', ' ').toUpperCase()}
// //                 </Badge>
// //               </div>

// //               <div className="space-y-4">
// //                 <div>
// //                   <h3 className="text-sm font-medium text-gray-700 mb-1">Service</h3>
// //                   <div className="flex items-center gap-2">
// //                     <Package size={18} className="text-blue-600" />
// //                     <span className="font-semibold">{service.name}</span>
// //                   </div>
// //                   <p className="text-sm text-gray-600 mt-1">{service.description}</p>
// //                 </div>

// //                 {order.notes && (
// //                   <div>
// //                     <h3 className="text-sm font-medium text-gray-700 mb-1">Notes</h3>
// //                     <p className="text-gray-600">{order.notes}</p>
// //                   </div>
// //                 )}

// //                 <div className="pt-4 border-t">
// //                   <div className="flex justify-between text-sm">
// //                     <span className="text-gray-600">Service Price</span>
// //                     <span className="font-semibold">₹{service.price}</span>
// //                   </div>
// //                   <div className="flex justify-between text-sm mt-2">
// //                     <span className="text-gray-600">Estimated Delivery</span>
// //                     <span className="font-semibold">{service.estimated_days} days</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card>

// //             {/* Uploaded Image */}
// //             {order.image_url && (
// //               <Card>
// //                 <h3 className="text-lg font-semibold mb-3">Uploaded Image</h3>
// //                 <img
// //                   src={order.image_url}
// //                   alt="Order"
// //                   className="w-full rounded-lg"
// //                 />
// //               </Card>
// //             )}
// //           </div>

// //           {/* Image Upload */}
// //           <div className="lg:col-span-1">
// //             {!order.image_url && order.status !== 'cancelled' && (
// //               <ImageUpload orderId={order.id} onUploadComplete={handleUploadComplete} />
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </ClientLayout>
// //   );
// // };


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ClientLayout } from '@/components/layout/ClientLayout';
// import { Card } from '@/components/common/Card';
// import { Badge } from '@/components/common/Badge';
// import { Button } from '@/components/common/Button';
// import { LoadingSpinner } from '@/components/common/LoadingSpinner';
// import { ImageUpload } from '@/components/orders/ImageUpload';
// import { ArrowLeft, Calendar, Package, IndianRupee, AlertCircle, Clock } from 'lucide-react';
// import { orderService } from '@/services/order.service';
// import { serviceService } from '@/services/service.service';
// import { Order } from '@/types/order.types';
// import { Service } from '@/types/service.types';
// import { format } from 'date-fns';
// import toast from 'react-hot-toast';

// export const OrderDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [service, setService] = useState<Service | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       loadOrderDetails(id);
//     }
//   }, [id]);

//   const loadOrderDetails = async (orderId: string) => {
//     try {
//       const orderData = await orderService.getMyOrderById(orderId);
//       setOrder(orderData);

//       const serviceData = await serviceService.getById(orderData.service_id);
//       setService(serviceData);
//     } catch (error: any) {
//       toast.error(error.response?.data?.detail || 'Failed to load order details');
//       navigate('/orders/me');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUploadComplete = (imageUrl: string) => {
//     toast.success('Image uploaded successfully!');
//     if (id) loadOrderDetails(id);
//   };

//   const getStatusVariant = (status: Order['status']) => {
//     switch (status) {
//       case 'completed':
//         return 'success';
//       case 'in_progress':
//         return 'info';
//       case 'ready':
//         return 'success';
//       case 'pending':
//         return 'warning';
//       case 'cancelled':
//         return 'danger';
//       default:
//         return 'default';
//     }
//   };

//   if (loading) {
//     return (
//       <ClientLayout>
//         <LoadingSpinner size={40} className="py-20" />
//       </ClientLayout>
//     );
//   }

//   if (!order || !service) {
//     return (
//       <ClientLayout>
//         <div className="text-center py-12">
//           <p className="text-gray-500">Order not found</p>
//           <Button onClick={() => navigate('/orders/me')} className="mt-4">
//             Back to Orders
//           </Button>
//         </div>
//       </ClientLayout>
//     );
//   }

//   return (
//     <ClientLayout>
//       <div className="max-w-4xl mx-auto">
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={() => navigate('/orders/me')}
//           className="mb-6"
//         >
//           <ArrowLeft size={16} className="mr-2" />
//           Back to Orders
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Order Details */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900 mb-2">
//                     Order #{order.id.slice(0, 8)}
//                   </h1>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Calendar size={16} />
//                     <span>Created {format(new Date(order.created_at), 'PPP')}</span>
//                   </div>
//                 </div>
//                 <Badge variant={getStatusVariant(order.status)}>
//                   {order.status.replace('_', ' ').toUpperCase()}
//                 </Badge>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-1">Service</h3>
//                   <div className="flex items-center gap-2">
//                     <Package size={18} className="text-blue-600" />
//                     <span className="font-semibold">{service.name}</span>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">{service.description}</p>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
//                   <p className="text-gray-700">{order.description}</p>
//                 </div>

//                 {order.notes && (
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-700 mb-1">Additional Notes</h3>
//                     <p className="text-gray-600 italic">{order.notes}</p>
//                   </div>
//                 )}

//                 {order.priority && (
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-700 mb-1">Priority</h3>
//                     <Badge variant={order.priority === 'urgent' ? 'danger' : order.priority === 'high' ? 'warning' : 'default'}>
//                       {order.priority.toUpperCase()}
//                     </Badge>
//                   </div>
//                 )}

//                 <div className="pt-4 border-t space-y-2">
//                   {order.quoted_price && (
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600 flex items-center gap-2">
//                         <IndianRupee size={16} />
//                         Quoted Price
//                       </span>
//                       <span className="font-semibold text-blue-600">₹{order.quoted_price}</span>
//                     </div>
//                   )}
                  
//                   {order.actual_price && (
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600 flex items-center gap-2">
//                         <IndianRupee size={16} />
//                         Actual Price
//                       </span>
//                       <span className="font-semibold text-green-600">₹{order.actual_price}</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 flex items-center gap-2">
//                       <Clock size={16} />
//                       Estimated Completion
//                     </span>
//                     <span className="font-semibold">{format(new Date(order.estimated_completion), 'PPP')}</span>
//                   </div>

//                   {order.actual_completion && (
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600 flex items-center gap-2">
//                         <AlertCircle size={16} />
//                         Completed On
//                       </span>
//                       <span className="font-semibold text-green-600">{format(new Date(order.actual_completion), 'PPP')}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Image Upload */}
//           <div className="lg:col-span-1">
//             {order.status !== 'cancelled' && order.status !== 'completed' && (
//               <ImageUpload orderId={order.id} onUploadComplete={handleUploadComplete} />
//             )}
//           </div>
//         </div>
//       </div>
//     </ClientLayout>
//   );
// };


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ImageUpload } from '@/components/orders/ImageUpload';
import { ImageGallery } from '@/components/orders/ImageGallery';
import { ArrowLeft, Calendar, Package, IndianRupee, AlertCircle, Clock } from 'lucide-react';
import { orderService } from '@/services/order.service';
import { serviceService } from '@/services/service.service';
import { Order } from '@/types/order.types';
import { Service } from '@/types/service.types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (id) {
      loadOrderDetails(id);
    }
  }, [id]);

  const loadOrderDetails = async (orderId: string) => {
    try {
      const orderData = await orderService.getMyOrderById(orderId);
      setOrder(orderData);

      const serviceData = await serviceService.getById(orderData.service_id);
      setService(serviceData);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to load order details');
      navigate('/orders/me');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (imageUrl: string) => {
    toast.success('Image uploaded successfully!');
    // Refresh image gallery
    setRefreshKey(prev => prev + 1);
  };

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
      case 'ready':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <ClientLayout>
        <LoadingSpinner size={40} className="py-20" />
      </ClientLayout>
    );
  }

  if (!order || !service) {
    return (
      <ClientLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Order not found</p>
          <Button onClick={() => navigate('/orders/me')} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-6xl mx-auto">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/orders/me')}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Orders
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Order #{order.id.slice(0, 8)}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>Created {format(new Date(order.created_at), 'PPP')}</span>
                  </div>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Service</h3>
                  <div className="flex items-center gap-2">
                    <Package size={18} className="text-blue-600" />
                    <span className="font-semibold">{service.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                  <p className="text-gray-700">{order.description}</p>
                </div>

                {order.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Additional Notes</h3>
                    <p className="text-gray-600 italic">{order.notes}</p>
                  </div>
                )}

                {order.priority && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Priority</h3>
                    <Badge variant={order.priority === 'urgent' ? 'danger' : order.priority === 'high' ? 'warning' : 'default'}>
                      {order.priority.toUpperCase()}
                    </Badge>
                  </div>
                )}

                <div className="pt-4 border-t space-y-2">
                  {order.quoted_price && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <IndianRupee size={16} />
                        Quoted Price
                      </span>
                      <span className="font-semibold text-blue-600">₹{order.quoted_price}</span>
                    </div>
                  )}
                  
                  {order.actual_price && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <IndianRupee size={16} />
                        Actual Price
                      </span>
                      <span className="font-semibold text-green-600">₹{order.actual_price}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Clock size={16} />
                      Estimated Completion
                    </span>
                    <span className="font-semibold">{format(new Date(order.estimated_completion), 'PPP')}</span>
                  </div>

                  {order.actual_completion && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <AlertCircle size={16} />
                        Completed On
                      </span>
                      <span className="font-semibold text-green-600">{format(new Date(order.actual_completion), 'PPP')}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Image Gallery */}
            <ImageGallery key={refreshKey} orderId={order.id} />
          </div>

          {/* Image Upload */}
          <div className="lg:col-span-1">
            {order.status !== 'cancelled' && order.status !== 'completed' && (
              <ImageUpload orderId={order.id} onUploadComplete={handleUploadComplete} />
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};