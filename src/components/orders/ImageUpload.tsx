import React, { useState, useRef } from "react";
import { Upload, Check, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { orderService } from "@/services/order.service";
import toast from "react-hot-toast";

interface ImageUploadProps {
  orderId: string;
  onUploadComplete: (imageUrl: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  orderId,
  onUploadComplete,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Get presigned upload URL
      toast.loading("Preparing upload...", { id: "upload" });
      const { url, s3_object_path } = await orderService.getUploadUrl(orderId);

      setUploadProgress(33);

      // Step 2: Upload file directly to S3
      toast.loading("Uploading image...", { id: "upload" });
      await orderService.uploadImage(url, selectedFile);

      setUploadProgress(66);

      // Step 3: Confirm upload with backend
      toast.loading("Confirming upload...", { id: "upload" });
      const result = await orderService.confirmUpload(orderId, {
        s3_object_path,
      });

      setUploadProgress(100);

      toast.success("Image uploaded successfully!", { id: "upload" });
      onUploadComplete(result.image_url || s3_object_path);

      // Reset
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.", {
        id: "upload",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
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
        Upload Order Image
      </h3>

      <div className="space-y-4">
        {/* File Input */}
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
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
        {/* Progress Bar */}
        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              {uploadProgress}% Complete
            </p>
          </div>
        )}

        {/* Actions */}
        {selectedFile && !uploading && (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} className="flex-1">
              <Upload size={16} className="mr-2" />
              Upload Image
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
