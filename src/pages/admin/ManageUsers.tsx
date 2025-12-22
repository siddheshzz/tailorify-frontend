import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { User, Mail, Calendar, Trash2 } from 'lucide-react';
import { userService } from '@/services/user.service';
import {  User as UserType, UserUpdate } from '@/types/user.types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingUser, setDeletingUser] = useState<UserType | null>(null);

  useEffect(() => {
    // Note: This endpoint doesn't exist in your backend
    // You'll need to add GET /api/v1/user/ endpoint for admin to list all users
    // For now, this is a placeholder
    // setLoading(false);
    // toast.info('User listing endpoint not available in backend');
    loadUsers()
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };


  // const handleCreate = async (data: UserType) => {
  //   try {
  //     await userService.create(data);
  //     toast.success('Service created successfully!');
  //     setShowModal(false);
  //     loadServices();
  //   } catch (error) {
  //     toast.error('Failed to create service');
  //     throw error;
  //   }
  // };

  // const handleUpdate = async (data: UserType) => {
  //   if (!editingService) return;

  //   try {
  //     await serviceService.update(editingService.id, data);
  //     toast.success('Service updated successfully!');
  //     setShowModal(false);
  //     setEditingService(undefined);
  //     loadServices();
  //   } catch (error) {
  //     toast.error('Failed to update service');
  //     throw error;
  //   }
  // };



  const handleDelete = async () => {
    if (!deletingUser) return;

    try {
      await userService.delete(deletingUser.id);
      toast.success('User deleted successfully!');
      setDeletingUser(null);
      // Reload users
    } catch (error) {
      toast.error('Failed to delete user');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
        <p className="text-gray-600">View and manage system users</p>
      </div>

      {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800 text-sm">
          ⚠️ Note: User listing endpoint needs to be added to the backend API.
          Add GET /api/v1/user/ endpoint that returns all users (admin only).
        </p>
      </div> */}

      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No users to display.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.full_name}</h3>
                    <Badge variant={user.user_type === 'admin' ? 'danger' : 'default'}>
                      {user.user_type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setDeletingUser(user)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
                {user.created_at && (
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Joined {format(new Date(user.created_at), 'PP')}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${deletingUser?.full_name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </AdminLayout>
  );
};