import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { BookingCard } from '@/components/bookings/BookingCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { bookingService } from '@/services/booking.service';
import { serviceService } from '@/services/service.service';
import { Booking } from '@/types/booking.types';
import { Service } from '@/types/service.types';
import toast from 'react-hot-toast';

export const ManageBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Record<string, Service>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bookingsData, servicesData] = await Promise.all([
        bookingService.getAll(),
        serviceService.getAll(),
      ]);

      setBookings(bookingsData);

      const servicesMap: Record<string, Service> = {};
      servicesData.forEach((service) => {
        servicesMap[service.id] = service;
      });
      setServices(servicesMap);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Bookings</h1>
        <p className="text-gray-600">View and manage all customer bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              serviceName={services[booking.service_id]?.name}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
};