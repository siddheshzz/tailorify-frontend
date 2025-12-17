// import React from 'react';
// import { ShoppingCart, Calendar, Eye } from 'lucide-react';
// import { Card } from '@/components/common/Card';
// import { Badge } from '@/components/common/Badge';
// import { Button } from '@/components/common/Button';
// import { Order } from '@/types/order.types';
// import { format } from 'date-fns';

// interface OrderCardProps {
//   order: Order;
//   onView: (order: Order) => void;
// }

// export const OrderCard: React.FC<OrderCardProps> = ({ order, onView }) => {
//   const getStatusVariant = (status: Order['status']) => {
//     switch (status) {
//       case 'completed':
//         return 'success';
//       case 'in_progress':
//         return 'info';
//       case 'pending':
//         return 'warning';
//       case 'cancelled':
//         return 'danger';
//       default:
//         return 'default';
//     }
//   };

//   return (
//     <Card hoverable>
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <ShoppingCart className="text-blue-600" size={20} />
//           <span className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</span>
//         </div>
//         <Badge variant={getStatusVariant(order.status)}>
//           {order.status.replace('_', ' ').toUpperCase()}
//         </Badge>
//       </div>

//       {order.notes && (
//         <p className="text-gray-600 text-sm mb-3">{order.notes}</p>
//       )}

//       <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//         <Calendar size={14} />
//         <span>{format(new Date(order.created_at), 'PPP')}</span>
//       </div>

//       <Button size="sm" onClick={() => onView(order)} className="w-full">
//         <Eye size={16} className="mr-2" />
//         View Details
//       </Button>
//     </Card>
//   );
// };


import React from 'react';
import { ShoppingCart, Calendar, Eye, IndianRupee, AlertCircle } from 'lucide-react';
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

  const getPriorityVariant = (priority?: Order['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'danger';
      case 'high':
        return 'warning';
      case 'normal':
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
        <div className="flex gap-2">
          <Badge variant={getStatusVariant(order.status)}>
            {order.status.replace('_', ' ').toUpperCase()}
          </Badge>
          {order.priority && order.priority !== 'normal' && (
            <Badge variant={getPriorityVariant(order.priority)}>
              {order.priority.toUpperCase()}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-3 line-clamp-2">{order.description}</p>

      {order.notes && (
        <p className="text-gray-600 text-xs mb-3 italic">Note: {order.notes}</p>
      )}

      <div className="space-y-2 mb-4">
        {order.quoted_price && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IndianRupee size={14} />
            <span className="font-semibold text-blue-600">₹{order.quoted_price}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={14} />
          <span>Created: {format(new Date(order.created_at), 'PPP')}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <AlertCircle size={14} />
          <span>Due: {format(new Date(order.estimated_completion), 'PPP')}</span>
        </div>
      </div>

      <Button size="sm" onClick={() => onView(order)} className="w-full">
        <Eye size={16} className="mr-2" />
        View Details
      </Button>
    </Card>
  );
};