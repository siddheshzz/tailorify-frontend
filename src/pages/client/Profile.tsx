import React, { useState, useEffect } from "react";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { User as UserIcon, Mail } from "lucide-react";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/user.types";
import toast from "react-hot-toast";
export const Profile: React.FC = () => {
  const { user: authUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    first_name:"",
    last_name:"",
    phone:"",
    address:"",
    password:"",
    email:""
  });
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = async () => {
    try {
      const data = await userService.getMe();
      setUser(data);
      setFormData({
        first_name: data.first_name,
        last_name:data.last_name,
        phone:data.phone,
        address:data.address,
        password:data.password,
        email:data.email,
        full_name: data.first_name + " "+ data.last_name
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const updated = await userService.updateMe( {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone:formData.phone,
        address:formData.address,
        password:formData.password,
      });
      setUser(updated);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
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
  if (!user) {
    return (
      <ClientLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Failed to load profile</p>
        </div>
      </ClientLayout>
    );
  }
  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
        <Card>
          {!editing ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon size={40} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.first_name}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <p className="text-gray-900 mt-1">{user.first_name} {user.last_name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900 mt-1">{user.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900 mt-1">{user.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <p className="text-gray-900 mt-1">{user.address} {user.last_name}</p>
                </div>




                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <p className="text-gray-900 mt-1 capitalize">{user.user_type}</p>
                </div>
              </div>

              <Button onClick={() => setEditing(true)} className="w-full">
                Edit Profile
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="First Name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                required
              />

               <Input
                label="Last Name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                required
              />

               <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />

               <Input
                label="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
               

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      first_name: user.first_name,
                      last_name: user.last_name,
                      phone: user.phone,
                      address:user.address,
                      password:user.password,
                      full_name:"",
                      email:user.email

                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" isLoading={submitting} className="flex-1">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </ClientLayout>
  );
};
