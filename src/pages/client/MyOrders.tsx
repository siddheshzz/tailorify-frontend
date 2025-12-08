import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { OrderCard } from '@/components/orders/OrderCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { orderService } from '@/services/order.service';
import { Order } from '@/types/order.types';
import toast from 'react-hot-toast';

export const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <Button onClick={() => navigate('/orders/create')}>
          <Plus size={20} className="mr-2" />
          New Order
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Button onClick={() => navigate('/orders/create')}>
            Create Your First Order
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onView={(order) => navigate(`/orders/${order.id}`)}
            />
          ))}
        </div>
      )}
    </ClientLayout>
  );
};