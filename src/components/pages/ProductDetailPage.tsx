import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { JewelryProducts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { ThreeDViewer } from '@/components/ui/three-d-viewer';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Crown, 
  Eye,
  Package,
  Shield,
  Star,
  Box
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<JewelryProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAR, setShowAR] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const product = await BaseCrudService.getById<JewelryProducts>('jewelryproducts', productId);
      setProduct(product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
    // In a real app, this would add the product to cart
    console.log('Adding to cart:', { product: product?._id, quantity });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.productName,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="font-paragraph text-dark-grey mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/catalog">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock additional images for gallery
  const productImages = [
    product.mainProductImage || 'https://static.wixstatic.com/media/7d1d95_cb8023ff444d49cd9f1f89177def3049~mv2.png?originWidth=576&originHeight=576',
    'https://static.wixstatic.com/media/7d1d95_44dc36eea37f46c3990b22a45f2559ee~mv2.png?originWidth=576&originHeight=576',
    'https://static.wixstatic.com/media/7d1d95_ebe16490cef44930ad36c5291310ed97~mv2.png?originWidth=576&originHeight=576',
    'https://static.wixstatic.com/media/7d1d95_b4fcf19fc4c5466e9d5294d6fb799e73~mv2.png?originWidth=576&originHeight=576'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-secondary/20">
        <div className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 font-paragraph text-sm text-dark-grey">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-primary transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-foreground">{product.productName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/catalog">
            <Button variant="ghost" className="text-dark-grey hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
              <Image
                src={productImages[selectedImage]}
                alt={product.productName || 'Product image'}
                className="w-full h-full object-cover"
                width={600}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isVipItem && (
                  <Badge className="bg-light-gold text-white">
                    <Crown className="h-4 w-4 mr-1" />
                    VIP Item
                  </Badge>
                )}
                {product.moderationStatus === 'approved' && (
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="h-4 w-4 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="secondary" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-primary' 
                      : 'border-secondary/20 hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={150}
                  />
                </button>
              ))}
            </div>

            {/* 3D/AR Viewer */}
            {product.threeDModelUrl && (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-foreground">
                    3D Model
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAR(!showAR)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Box className="h-4 w-4 mr-2" />
                    {showAR ? 'Hide AR' : 'View in AR'}
                  </Button>
                </div>
                <ThreeDViewer modelUrl={product.threeDModelUrl} />
              </Card>
            )}
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="sticky top-8">
              {/* Title and Price */}
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                  {product.productName || 'Untitled Product'}
                </h1>
                
                {product.sku && (
                  <p className="font-paragraph text-dark-grey mb-4">
                    SKU: {product.sku}
                  </p>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <p className="text-3xl font-heading font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-paragraph text-sm text-dark-grey ml-2">
                      (4.8) 24 reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Description
                </h3>
                <p className="font-paragraph text-dark-grey leading-relaxed">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>

              {/* Specifications */}
              <Card className="p-4 mb-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Product Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-paragraph text-dark-grey">SKU</span>
                    <span className="font-paragraph text-foreground">{product.sku || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-paragraph text-dark-grey">Status</span>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        product.moderationStatus === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {product.moderationStatus || 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-paragraph text-dark-grey">Availability</span>
                    <span className="font-paragraph text-foreground">In Stock</span>
                  </div>
                </div>
              </Card>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="font-paragraph text-lg font-medium text-foreground px-4">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-secondary text-dark-grey hover:bg-secondary/10 py-3"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Request Quote
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 space-y-3 text-sm font-paragraph text-dark-grey">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Free shipping on orders over $500
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  30-day return policy
                </div>
                <div className="flex items-center">
                  <Crown className="h-4 w-4 mr-2" />
                  Authenticity guaranteed
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would typically fetch related products */}
            <div className="text-center py-8 text-dark-grey">
              <p className="font-paragraph">Related products will be displayed here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}