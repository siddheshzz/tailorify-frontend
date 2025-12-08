import React from 'react';
import { ShoppingCart, Calendar, Eye } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Order } from '@/types/order.types';
import { format } from 'date-fns';

interface OrderCardProps {
  order: Order;
  onView: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onView }) => {
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

  return (
    <Card hoverable>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-blue-600" size={20} />
          <span className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</span>
        </div>
        <Badge variant={getStatusVariant(order.status)}>
          {order.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      {order.notes && (
        <p className="text-gray-600 text-sm mb-3">{order.notes}</p>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Calendar size={14} />
        <span>{format(new Date(order.created_at), 'PPP')}</span>
      </div>

      <Button size="sm" onClick={() => onView(order)} className="w-full">
        <Eye size={16} className="mr-2" />
        View Details
      </Button>
    </Card>
  );
};