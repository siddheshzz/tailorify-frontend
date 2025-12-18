import React, { useState, useEffect } from 'react';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { TextArea } from '@/components/common/TextArea';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { BookingCard } from '@/components/bookings/BookingCard';
import { Plus } from 'lucide-react';
import { bookingService } from '@/services/booking.service';
import { serviceService } from '@/services/service.service';
import { Booking } from '@/types/booking.types';
import { Service } from '@/types/service.types';
import toast from 'react-hot-toast';

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesMap, setServicesMap] = useState<Record<string, Service>>({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    service_id: '',
    appointment_time: '',
    notes: '',
  });

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
      setServices(servicesData);

      const map: Record<string, Service> = {};
      servicesData.forEach((service) => {
        map[service.id] = service;
      });
      setServicesMap(map);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.service_id || !formData.appointment_time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await bookingService.create({
        service_id: formData.service_id,
        appointment_time: formData.appointment_time,
        notes: formData.notes || undefined,
      });

      toast.success('Booking created successfully!');
      setShowForm(false);
      setFormData({ service_id: '', appointment_time: '', notes: '' });
      loadData();
    } catch (error) {
      toast.error('Failed to create booking');
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={20} className="mr-2" />
          New Booking
        </Button>
      </div>

      {/* Create Booking Form */}
      {showForm && (
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                    {service.name} - ₹{service.base_price}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Booking Date & Time *"
              type="datetime-local"
              value={formData.appointment_time}
              onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
              required
            />

            <TextArea
              label="Notes (Optional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special requirements..."
              rows={3}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={submitting} className="flex-1">
                Create Booking
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
          <Button onClick={() => setShowForm(true)}>Create Your First Booking</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              serviceName={servicesMap[booking.service_id]?.name}
            />
          ))}
        </div>
      )}
    </ClientLayout>
  );
};