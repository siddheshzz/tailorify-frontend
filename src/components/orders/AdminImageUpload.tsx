import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { orderService } from "@/services/order.service";
import toast from "react-hot-toast";

interface AdminImageUploadProps {
  orderId: string;
  onUploadComplete: () => void;
}

export const AdminImageUpload: React.FC<AdminImageUploadProps> = ({
  orderId,
  onUploadComplete,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageType, setImageType] = useState<
    "before" | "after" | "reference" | "instruction"
  >("before");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    try {
      await orderService.adminUploadImage(orderId, selectedFile, imageType);

      toast.success("Image uploaded successfully!");
      onUploadComplete();

      // Reset
      setSelectedFile(null);
      setPreview(null);
      setImageType("before");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ImageIcon size={20} className="text-blue-600" />
        Admin: Add Order Image
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Type
          </label>
          <select
            value={imageType}
            onChange={(e) => setImageType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={uploading}
          >
            <option value="before">Before</option>
            <option value="after">After</option>
            <option value="reference">Reference</option>
            <option value="instruction">Instruction</option>
          </select>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          {!preview ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors cursor-pointer"
              disabled={uploading}
            >
              <div className="flex flex-col items-center gap-2 text-gray-600">
                <Upload size={40} />
                <p className="font-medium">Click to select image</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </button>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              {!uploading && (
                <button
                  onClick={handleCancel}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>

        {selectedFile && !uploading && (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              isLoading={uploading}
              className="flex-1"
            >
              <Upload size={16} className="mr-2" />
              Upload Image
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
