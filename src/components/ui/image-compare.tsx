import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { 
  Eye, 
  EyeOff, 
  Download, 
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Crown
} from 'lucide-react';

interface ImageCompareProps {
  originalImage: string;
  enhancedImage: string;
  productName?: string;
  isVipItem?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

export function ImageCompare({ 
  originalImage, 
  enhancedImage, 
  productName = 'Product',
  isVipItem = false,
  onApprove,
  onReject,
  showActions = false
}: ImageCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  const [showEnhanced, setShowEnhanced] = useState(true);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const resetComparison = () => {
    setSliderPosition(50);
    setZoom(1);
    setShowOriginal(true);
    setShowEnhanced(true);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-heading font-semibold text-foreground">
              {productName} - AI Enhancement
            </h3>
            {isVipItem && (
              <Badge className="bg-light-gold text-white">
                <Crown className="h-3 w-3 mr-1" />
                VIP
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Visibility Toggles */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className={`${showOriginal ? 'bg-blue-100 text-blue-800' : 'text-dark-grey'}`}
            >
              {showOriginal ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              Original
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEnhanced(!showEnhanced)}
              className={`${showEnhanced ? 'bg-green-100 text-green-800' : 'text-dark-grey'}`}
            >
              {showEnhanced ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              Enhanced
            </Button>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border border-secondary/20 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="px-2 font-paragraph text-sm text-dark-grey">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Reset */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetComparison}
              className="border-secondary text-dark-grey hover:bg-secondary/10"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image Comparison */}
      <div className="relative">
        <div
          ref={containerRef}
          className="relative aspect-video bg-secondary/10 overflow-hidden cursor-col-resize"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Original Image */}
          {showOriginal && (
            <div 
              className="absolute inset-0"
              style={{ 
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                transform: `scale(${zoom})`,
                transformOrigin: 'center'
              }}
            >
              <Image
                src={originalImage}
                alt="Original image"
                className="w-full h-full object-cover"
                width={800}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-100 text-blue-800">
                  Original
                </Badge>
              </div>
            </div>
          )}

          {/* Enhanced Image */}
          {showEnhanced && (
            <div 
              className="absolute inset-0"
              style={{ 
                clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                transform: `scale(${zoom})`,
                transformOrigin: 'center'
              }}
            >
              <Image
                src={enhancedImage}
                alt="AI enhanced image"
                className="w-full h-full object-cover"
                width={800}
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-100 text-green-800">
                  AI Enhanced
                </Badge>
              </div>
            </div>
          )}

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Move className="h-4 w-4 text-dark-grey" />
            </div>
          </div>

          {/* Watermark for VIP items */}
          {isVipItem && (
            <div className="absolute bottom-4 right-4 opacity-50">
              <div className="bg-light-gold/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                <span className="font-paragraph text-xs text-white font-medium">
                  VIP EXCLUSIVE
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Enhancement Details */}
        <div className="p-4 bg-primary/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-paragraph text-sm font-medium text-foreground">Brightness</p>
              <p className="font-paragraph text-xs text-green-600">+15%</p>
            </div>
            <div>
              <p className="font-paragraph text-sm font-medium text-foreground">Contrast</p>
              <p className="font-paragraph text-xs text-green-600">+20%</p>
            </div>
            <div>
              <p className="font-paragraph text-sm font-medium text-foreground">Sharpness</p>
              <p className="font-paragraph text-xs text-green-600">+25%</p>
            </div>
            <div>
              <p className="font-paragraph text-sm font-medium text-foreground">Color</p>
              <p className="font-paragraph text-xs text-green-600">Enhanced</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-secondary/20">
        <div className="flex items-center justify-between">
          {/* Download Options */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadImage(originalImage, `${productName}-original.jpg`)}
              className="border-secondary text-dark-grey hover:bg-secondary/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Original
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadImage(enhancedImage, `${productName}-enhanced.jpg`)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="h-4 w-4 mr-2" />
              Enhanced
            </Button>
          </div>

          {/* Approval Actions */}
          {showActions && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={onReject}
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Reject
              </Button>
              <Button
                onClick={onApprove}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Approve Enhancement
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 pb-4">
        <p className="font-paragraph text-xs text-dark-grey text-center">
          Drag the slider to compare images • Use zoom controls for detailed inspection • Toggle visibility to focus on specific versions
        </p>
      </div>
    </Card>
  );
}