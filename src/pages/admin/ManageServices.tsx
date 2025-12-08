import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceForm } from '@/components/services/ServiceForm';
import { Modal } from '@/components/common/Modal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Plus } from 'lucide-react';
import { serviceService } from '@/services/service.service';
import { Service, ServiceCreate } from '@/types/service.types';
import toast from 'react-hot-toast';

export const ManageServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>(undefined);
  const [deletingService, setDeletingService] = useState<Service | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await serviceService.getAll();
      setServices(data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: ServiceCreate) => {
    try {
      await serviceService.create(data);
      toast.success('Service created successfully!');
      setShowModal(false);
      loadServices();
    } catch (error) {
      toast.error('Failed to create service');
      throw error;
    }
  };

  const handleUpdate = async (data: ServiceCreate) => {
    if (!editingService) return;

    try {
      await serviceService.update(editingService.id, data);
      toast.success('Service updated successfully!');
      setShowModal(false);
      setEditingService(undefined);
      loadServices();
    } catch (error) {
      toast.error('Failed to update service');
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!deletingService) return;

    try {
      await serviceService.delete(deletingService.id);
      toast.success('Service deleted successfully!');
      setDeletingService(null);
      loadServices();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const openCreateModal = () => {
    setEditingService(undefined);
    setShowModal(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setShowModal(true);
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Services</h1>
          <p className="text-gray-600">Create and manage your tailoring services</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus size={20} className="mr-2" />
          Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No services available.</p>
          <Button onClick={openCreateModal}>Create Your First Service</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={openEditModal}
              onDelete={setDeletingService}
              isAdmin
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingService(undefined);
        }}
        title={editingService ? 'Edit Service' : 'Create New Service'}
      >
        <ServiceForm
          service={editingService}
          onSubmit={editingService ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowModal(false);
            setEditingService(undefined);
          }}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingService}
        onClose={() => setDeletingService(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${deletingService?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </AdminLayout>
  );
};