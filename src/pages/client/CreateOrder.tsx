// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ClientLayout } from '@/components/layout/ClientLayout';
// import { Card } from '@/components/common/Card';
// import { Input } from '@/components/common/Input';
// import { TextArea } from '@/components/common/TextArea';
// import { Button } from '@/components/common/Button';
// import { LoadingSpinner } from '@/components/common/LoadingSpinner';
// import { serviceService } from '@/services/service.service';
// import { orderService } from '@/services/order.service';
// import { Service } from '@/types/service.types';
// import toast from 'react-hot-toast';

// export const CreateOrder: React.FC = () => {
//   const navigate = useNavigate();
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [selectedServiceId, setSelectedServiceId] = useState('');
//   const [notes, setNotes] = useState('');

//   useEffect(() => {
//     loadServices();
//   }, []);

//   const loadServices = async () => {
//     try {
//       const data = await serviceService.getAll();
//       setServices(data);
//     } catch (error) {
//       toast.error('Failed to load services');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!selectedServiceId) {
//       toast.error('Please select a service');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const order = await orderService.create({
//         service_id: selectedServiceId,
//         notes: notes || undefined,
//       });
//       toast.success('Order created successfully!');
//       navigate(`/orders/${order.id}`);
//     } catch (error) {
//       toast.error('Failed to create order');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <ClientLayout>
//         <LoadingSpinner size={40} className="py-20" />
//       </ClientLayout>
//     );
//   }

//   return (
//     <ClientLayout>
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Order</h1>

//         <Card>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Service *
//               </label>
//               <select
//                 value={selectedServiceId}
//                 onChange={(e) => setSelectedServiceId(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               >
//                 <option value="">Choose a service...</option>
//                 {services.map((service) => (
//                   <option key={service.id} value={service.id}>
//                     {service.name} - ₹{service.price} ({service.estimated_days} days)
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <TextArea
//               label="Additional Notes (Optional)"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Any specific requirements or instructions..."
//               rows={4}
//             />

//             <div className="flex gap-3">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 onClick={() => navigate('/')}
//                 className="flex-1"
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" isLoading={submitting} className="flex-1">
//                 Create Order
//               </Button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </ClientLayout>
//   );
// };




import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { TextArea } from '@/components/common/TextArea';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { serviceService } from '@/services/service.service';
import { orderService } from '@/services/order.service';
import { useAuthStore } from '@/store/authStore';
import { Service } from '@/types/service.types';
import toast from 'react-hot-toast';

export const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    service_id: location.state?.serviceId || '',
    description: '',
    notes: '',
    priority: 'normal' as 'normal' | 'high' | 'urgent',
    quoted_price: '',
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await serviceService.getAll();
      setServices(data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.service_id) {
      toast.error('Please select a service');
      return;
    }

    if (!formData.description) {
      toast.error('Please provide a description');
      return;
    }

    if (!user?.user_id) {
      toast.error('User not authenticated');
      return;
    }

    setSubmitting(true);
    try {
      const order = await orderService.create({
        client_id: user.user_id,
        service_id: formData.service_id,
        description: formData.description,
        notes: formData.notes || undefined,
        priority: formData.priority,
        quoted_price: formData.quoted_price ? Number(formData.quoted_price) : undefined,
      });
      toast.success('Order created successfully!');
      navigate(`/orders/${order.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to create order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ClientLayout>
        <LoadingSpinner size={40} className="py-20" />
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Order</h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Service *
              </label>
              <select
                value={formData.service_id}
                onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ₹{service.base_price} ({service.estimated_days} days)
                  </option>
                ))}
              </select>
            </div>

            <TextArea
              label="Description *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your tailoring requirements..."
              rows={4}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <Input
              label="Quoted Price (Optional)"
              type="number"
              value={formData.quoted_price}
              onChange={(e) => setFormData({ ...formData, quoted_price: e.target.value })}
              placeholder="Enter price if known"
              step="0.01"
              min="0"
            />

            <TextArea
              label="Additional Notes (Optional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special instructions or requirements..."
              rows={3}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={submitting} className="flex-1">
                Create Order
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </ClientLayout>
  );
};