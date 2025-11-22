import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Maximize, Download } from 'lucide-react';

interface ThreeDViewerProps {
  modelUrl: string;
  className?: string;
}

export function ThreeDViewer({ modelUrl, className = '' }: ThreeDViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real implementation, this would initialize a 3D viewer
    // using libraries like Three.js, Babylon.js, or model-viewer
    console.log('Initializing 3D viewer with model:', modelUrl);
  }, [modelUrl]);

  const handleReset = () => {
    console.log('Resetting 3D view');
  };

  const handleFullscreen = () => {
    if (viewerRef.current) {
      viewerRef.current.requestFullscreen();
    }
  };

  const handleDownload = () => {
    console.log('Downloading 3D model');
  };

  return (
    <div className={`relative ${className}`}>
      <Card className="overflow-hidden">
        {/* 3D Viewer Container */}
        <div
          ref={viewerRef}
          className="relative aspect-square bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center"
        >
          {/* Placeholder for 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-lg transform rotate-12"></div>
            </div>
            <p className="font-paragraph text-dark-grey">
              3D Model Viewer
            </p>
            <p className="font-paragraph text-xs text-dark-grey mt-1">
              Click and drag to rotate
            </p>
          </motion.div>

          {/* Loading Overlay */}
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center opacity-0 transition-opacity duration-200">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="font-paragraph text-sm text-dark-grey">Loading 3D model...</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 bg-white border-t border-secondary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="border-secondary text-dark-grey hover:bg-secondary/10"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFullscreen}
                className="border-secondary text-dark-grey hover:bg-secondary/10"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="mt-3 text-xs font-paragraph text-dark-grey">
            <p>• Mouse: Rotate view</p>
            <p>• Scroll: Zoom in/out</p>
            <p>• Right-click + drag: Pan</p>
          </div>
        </div>
      </Card>

      {/* AR Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4"
      >
        <Button
          className="w-full bg-gradient-to-r from-primary to-light-gold hover:from-primary/90 hover:to-light-gold/90 text-white"
          onClick={() => console.log('Opening AR view')}
        >
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 mr-2 bg-white/20 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            View in Augmented Reality
          </div>
        </Button>
      </motion.div>

      {/* Model Info */}
      <div className="mt-4 p-3 bg-primary/5 rounded-lg">
        <h4 className="font-paragraph text-sm font-medium text-foreground mb-2">
          3D Model Information
        </h4>
        <div className="space-y-1 text-xs font-paragraph text-dark-grey">
          <div className="flex justify-between">
            <span>Format:</span>
            <span>GLB/GLTF</span>
          </div>
          <div className="flex justify-between">
            <span>File Size:</span>
            <span>2.4 MB</span>
          </div>
          <div className="flex justify-between">
            <span>Polygons:</span>
            <span>15,420</span>
          </div>
          <div className="flex justify-between">
            <span>Textures:</span>
            <span>4K Resolution</span>
          </div>
        </div>
      </div>
    </div>
  );
}