import React, { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Image as ImageIcon, Download, Eye } from 'lucide-react';
import { orderService } from '@/services/order.service';
import { OrderImage } from '@/types/order.types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface ImageGalleryProps {
  orderId: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ orderId }) => {
  const [images, setImages] = useState<OrderImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<OrderImage | null>(null);

  useEffect(() => {
    loadImages();
  }, [orderId]);

  const loadImages = async () => {
    try {
      const data = await orderService.getOrderImages(orderId);
      console.log("************")
      console.log("************")
      console.log(data)

      console.log("************")
      console.log("************")
      setImages(data);
    } catch (error) {
      console.error('Failed to load images:', error);
      // Don't show error toast, just show empty state
    } finally {
      setLoading(false);
    }
  };

  const getImageTypeColor = (type: OrderImage['image_type']) => {
    switch (type) {
      case 'before':
        return 'warning';
      case 'after':
        return 'success';
      case 'reference':
        return 'info';
      case 'instruction':
        return 'default';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Card>
        <LoadingSpinner size={24} className="py-8" />
      </Card>
    );
  }

  if (images.length === 0) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">
          <ImageIcon size={40} className="mx-auto mb-2 text-gray-400" />
          <p>No images uploaded yet</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ImageIcon size={20} className="text-blue-600" />
          Order Images ({images.length})
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.s3_url}
                alt={`${image.image_type} image`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant={getImageTypeColor(image.image_type)} className="text-xs">
                  {image.image_type}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">
            Click on any image to view full size
          </p>
        </div>
      </Card>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
            <img
              src={selectedImage.s3_url}
              alt={`${selectedImage.image_type} image`}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant={getImageTypeColor(selectedImage.image_type)}>
                    {selectedImage.image_type.toUpperCase()}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">
                    Uploaded: {format(new Date(selectedImage.uploaded_at), 'PPP p')}
                  </p>
                </div>
                
                  <a href={selectedImage.s3_url}
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};