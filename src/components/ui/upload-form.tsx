import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface UploadFormProps {
  onSubmit?: (data: ProductFormData) => void;
  isSubmitting?: boolean;
}

interface ProductFormData {
  productName: string;
  description: string;
  price: number;
  sku: string;
  images: File[];
  threeDModel?: File;
  isVipItem: boolean;
  isVisibleToPublic: boolean;
  isVisibleToRetailers: boolean;
  isVisibleToWholesalers: boolean;
}

export function UploadForm({ onSubmit, isSubmitting = false }: UploadFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    description: '',
    price: 0,
    sku: '',
    images: [],
    isVipItem: false,
    isVisibleToPublic: true,
    isVisibleToRetailers: true,
    isVisibleToWholesalers: false,
  });
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageFiles].slice(0, 10) // Max 10 images
      }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageFiles].slice(0, 10)
      }));
    }
  };

  const handleModelSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        threeDModel: file
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const sku = `JWL-${timestamp}-${random}`;
    handleInputChange('sku', sku);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card className="p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="productName" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
              Product Name *
            </Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) => handleInputChange('productName', e.target.value)}
              placeholder="Enter product name"
              className="font-paragraph"
              required
            />
          </div>

          <div>
            <Label htmlFor="sku" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
              SKU *
            </Label>
            <div className="flex gap-2">
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="Product SKU"
                className="font-paragraph"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateSKU}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Generate
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="price" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
              Price (USD) *
            </Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="font-paragraph"
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your jewelry piece in detail..."
              rows={4}
              className="font-paragraph"
              required
            />
          </div>
        </div>
      </Card>

      {/* Image Upload */}
      <Card className="p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
          Product Images
        </h3>
        
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-secondary/20 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <ImageIcon className="h-12 w-12 text-dark-grey mx-auto mb-4" />
          <h4 className="font-paragraph font-medium text-foreground mb-2">
            Drag and drop images here, or click to select
          </h4>
          <p className="font-paragraph text-sm text-dark-grey mb-4">
            Upload up to 10 high-quality images (JPG, PNG, WebP)
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Upload className="h-4 w-4 mr-2" />
            Select Images
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {formData.images.length > 0 && (
          <div className="mt-6">
            <h4 className="font-paragraph font-medium text-foreground mb-4">
              Selected Images ({formData.images.length}/10)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {formData.images.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  {index === 0 && (
                    <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs">
                      Main
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* 3D Model Upload */}
      <Card className="p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
          3D Model (Optional)
        </h3>
        
        <div className="border-2 border-dashed border-secondary/20 rounded-lg p-6 text-center">
          <FileText className="h-8 w-8 text-dark-grey mx-auto mb-3" />
          <p className="font-paragraph text-sm text-dark-grey mb-4">
            Upload a 3D model file (GLB, GLTF, OBJ)
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => modelInputRef.current?.click()}
            className="border-secondary text-dark-grey hover:bg-secondary/10"
          >
            <Upload className="h-4 w-4 mr-2" />
            Select 3D Model
          </Button>
          <input
            ref={modelInputRef}
            type="file"
            accept=".glb,.gltf,.obj"
            onChange={handleModelSelect}
            className="hidden"
          />
        </div>

        {formData.threeDModel && (
          <div className="mt-4 p-4 bg-primary/5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-paragraph text-sm text-foreground">
                {formData.threeDModel.name}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleInputChange('threeDModel', undefined)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>

      {/* Visibility Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
          Visibility & Access
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-paragraph font-medium text-foreground">
                VIP Item
              </Label>
              <p className="font-paragraph text-sm text-dark-grey">
                Mark as premium/exclusive item with special branding
              </p>
            </div>
            <Switch
              checked={formData.isVipItem}
              onCheckedChange={(checked) => handleInputChange('isVipItem', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-paragraph font-medium text-foreground">
                Visible to Public
              </Label>
              <p className="font-paragraph text-sm text-dark-grey">
                Allow public customers to view and purchase
              </p>
            </div>
            <Switch
              checked={formData.isVisibleToPublic}
              onCheckedChange={(checked) => handleInputChange('isVisibleToPublic', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-paragraph font-medium text-foreground">
                Visible to Retailers
              </Label>
              <p className="font-paragraph text-sm text-dark-grey">
                Allow retailers to access and resell
              </p>
            </div>
            <Switch
              checked={formData.isVisibleToRetailers}
              onCheckedChange={(checked) => handleInputChange('isVisibleToRetailers', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-paragraph font-medium text-foreground">
                Visible to Wholesalers
              </Label>
              <p className="font-paragraph text-sm text-dark-grey">
                Allow other wholesalers to view (B2B network)
              </p>
            </div>
            <Switch
              checked={formData.isVisibleToWholesalers}
              onCheckedChange={(checked) => handleInputChange('isVisibleToWholesalers', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Upload Progress */}
      {isSubmitting && (
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
            <div className="flex-1">
              <p className="font-paragraph font-medium text-foreground mb-2">
                Uploading product...
              </p>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          </div>
        </Card>
      )}

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          className="border-secondary text-dark-grey hover:bg-secondary/10"
        >
          Save as Draft
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || formData.images.length === 0}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Product
            </>
          )}
        </Button>
      </div>

      {/* Guidelines */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h4 className="font-paragraph font-semibold text-foreground mb-3 flex items-center">
          <AlertCircle className="h-5 w-5 text-primary mr-2" />
          Upload Guidelines
        </h4>
        <ul className="space-y-2 font-paragraph text-sm text-dark-grey">
          <li>• Use high-resolution images (minimum 1200x1200 pixels)</li>
          <li>• Include multiple angles and detail shots</li>
          <li>• Ensure good lighting and neutral backgrounds</li>
          <li>• First image will be used as the main product image</li>
          <li>• 3D models enhance customer experience and increase sales</li>
          <li>• All products go through moderation before going live</li>
        </ul>
      </Card>
    </form>
  );
}