import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { TextArea } from '@/components/common/TextArea';
import { Button } from '@/components/common/Button';
import { Order, OrderCreate } from '@/types/order.types';

interface AdminOrderFormProps {
  order: Order;
  onSubmit: (data: Partial<OrderCreate>) => Promise<void>;
  onCancel: () => void;
}

export const AdminOrderForm: React.FC<AdminOrderFormProps> = ({ order, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: order.description,
    status: order.status,
    priority: order.priority || 'normal',
    quoted_price: order.quoted_price?.toString() || '',
    actual_price: order.actual_price?.toString() || '',
    notes: order.notes || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({
        client_id: order.client_id,
        service_id: order.service_id,
        description: formData.description,
        status: formData.status as any,
        priority: formData.priority as any,
        quoted_price: formData.quoted_price ? Number(formData.quoted_price) : undefined,
        actual_price: formData.actual_price ? Number(formData.actual_price) : undefined,
        notes: formData.notes || undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextArea
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        rows={3}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Quoted Price (₹)"
          type="number"
          value={formData.quoted_price}
          onChange={(e) => setFormData({ ...formData, quoted_price: e.target.value })}
          step="0.01"
          min="0"
        />

        <Input
          label="Actual Price (₹)"
          type="number"
          value={formData.actual_price}
          onChange={(e) => setFormData({ ...formData, actual_price: e.target.value })}
          step="0.01"
          min="0"
        />
      </div>

      <TextArea
        label="Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        rows={3}
      />

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} className="flex-1">
          Update Order
        </Button>
      </div>
    </form>
  );
};