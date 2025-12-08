import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { TextArea } from '@/components/common/TextArea';
import { Button } from '@/components/common/Button';
import { Service, ServiceCreate } from '@/types/service.types';

interface ServiceFormProps {
  service?: Service;
  onSubmit: (data: ServiceCreate) => Promise<void>;
  onCancel: () => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ServiceCreate>({
    name: '',
    description: '',
    price: 0,
    estimated_days: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price,
        estimated_days: service.estimated_days,
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Service Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Shirt Tailoring"
        required
      />

      <TextArea
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Describe the service..."
        rows={4}
        required
      />

      <Input
        label="Price (₹)"
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        min="0"
        step="0.01"
        required
      />

      <Input
        label="Estimated Days"
        type="number"
        value={formData.estimated_days}
        onChange={(e) => setFormData({ ...formData, estimated_days: Number(e.target.value) })}
        min="1"
        required
      />

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} className="flex-1">
          {service ? 'Update' : 'Create'} Service
        </Button>
      </div>
    </form>
  );
};