import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Modal } from '@/components/common/Modal';
import { Eye, Edit, Trash2, Calendar } from 'lucide-react';
import { orderService } from '@/services/order.service';
import { serviceService } from '@/services/service.service';
import { Order } from '@/types/order.types';
import { Service } from '@/types/service.types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const ManageOrders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<Record<string, Service>>({});
  const [loading, setLoading] = useState(true);
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersData, servicesData] = await Promise.all([
        orderService.getAll(),
        serviceService.getAll(),
      ]);

      setOrders(ordersData);

      const servicesMap: Record<string, Service> = {};
      servicesData.forEach((service) => {
        servicesMap[service.id] = service;
      });
      setServices(servicesMap);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingOrder) return;

    try {
      await orderService.delete(deletingOrder.id);
      toast.success('Order deleted successfully!');
      setDeletingOrder(null);
      loadData();
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const handleStatusUpdate = async () => {
    if (!editingOrder || !newStatus) return;

    try {
      await orderService.update(editingOrder.id, { 
        service_id: editingOrder.service_id,
        notes: editingOrder.notes 
      });
      toast.success('Order updated successfully!');
      setEditingOrder(null);
      setNewStatus('');
      loadData();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
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
      <AdminLayout>
        <LoadingSpinner size={40} className="py-20" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Orders</h1>
        <p className="text-gray-600">View and manage all customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id.slice(0, 8)}
                    </h3>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-2">
                    Service: {services[order.service_id]?.name || 'Unknown'}
                  </p>

                  {order.notes && (
                    <p className="text-sm text-gray-500 mb-2">Notes: {order.notes}</p>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>{format(new Date(order.created_at), 'PPP')}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEditingOrder(order);
                      setNewStatus(order.status);
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeletingOrder(order)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Status Modal */}
      <Modal
        isOpen={!!editingOrder}
        onClose={() => {
          setEditingOrder(null);
          setNewStatus('');
        }}
        title="Update Order Status"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setEditingOrder(null);
                setNewStatus('');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate} className="flex-1">
              Update Status
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingOrder}
        onClose={() => setDeletingOrder(null)}
        onConfirm={handleDelete}
        title="Delete Order"
        message={`Are you sure you want to delete order #${deletingOrder?.id.slice(0, 8)}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </AdminLayout>
  );
};