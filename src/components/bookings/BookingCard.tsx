import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Booking } from '@/types/booking.types';
import { format } from 'date-fns';

interface BookingCardProps {
  booking: Booking;
  serviceName?: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, serviceName }) => {
  const getStatusVariant = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="text-blue-600" size={20} />
          <span className="font-semibold text-gray-900">{serviceName || 'Service'}</span>
        </div>
        <Badge variant={getStatusVariant(booking.status)}>
          {booking.status.toUpperCase()}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={14} />
          <span>{format(new Date(booking.booking_date), 'PPP p')}</span>
        </div>

        {booking.notes && (
          <p className="text-sm text-gray-600">{booking.notes}</p>
        )}
      </div>
    </Card>
  );
};