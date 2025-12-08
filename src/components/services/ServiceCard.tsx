import React from 'react';
import { Package, Clock, IndianRupee } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Service } from '@/types/service.types';

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
  onEdit?: (service: Service) => void;
  onDelete?: (service: Service) => void;
  isAdmin?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  return (
    <Card hoverable={!!onSelect} className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Package className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
        </div>
      </div>

      <p className="text-gray-600 mb-4 flex-1">{service.description}</p>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <IndianRupee size={16} />
          <span className="font-semibold text-blue-600">₹{service.price}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{service.estimated_days} days</span>
        </div>
      </div>

      <div className="flex gap-2">
        {isAdmin ? (
          <>
            {onEdit && (
              <Button variant="secondary" size="sm" onClick={() => onEdit(service)} className="flex-1">
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" size="sm" onClick={() => onDelete(service)} className="flex-1">
                Delete
              </Button>
            )}
          </>
        ) : (
          onSelect && (
            <Button onClick={() => onSelect(service)} className="w-full">
              Book Service
            </Button>
          )
        )}
      </div>
    </Card>
  );
};