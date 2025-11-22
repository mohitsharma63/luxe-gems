import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { JewelryProducts } from '@/entities';
import { Eye, ShoppingCart, Star, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: JewelryProducts;
  viewMode?: 'grid' | 'list';
  showVipBadge?: boolean;
}

export function ProductCard({ product, viewMode = 'grid', showVipBadge = false }: ProductCardProps) {
  const formatPrice = (price?: number) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (viewMode === 'list') {
    return (
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="relative md:w-48 md:h-48 flex-shrink-0">
            <Image
              src={product.mainProductImage || 'https://static.wixstatic.com/media/7d1d95_ba27b1bd0a59460387aa2e2c53a04e1e~mv2.png?originWidth=256&originHeight=256'}
              alt={product.productName || 'Jewelry product'}
              className="w-full h-48 object-cover rounded-lg"
              width={192}
            />
            {showVipBadge && product.isVipItem && (
              <Badge className="absolute top-2 left-2 bg-light-gold text-white">
                <Crown className="h-3 w-3 mr-1" />
                VIP
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {product.productName || 'Untitled Product'}
                </h3>
                {product.sku && (
                  <p className="font-paragraph text-sm text-dark-grey mb-2">
                    SKU: {product.sku}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-heading font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>

            <p className="font-paragraph text-dark-grey mb-4 line-clamp-3">
              {product.description || 'No description available.'}
            </p>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.moderationStatus && (
                <Badge 
                  variant="secondary" 
                  className={`${
                    product.moderationStatus === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {product.moderationStatus}
                </Badge>
              )}
              {product.isVisibleToPublic && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Public
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link to={`/product/${product._id}`} className="flex-1">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Image */}
        <div className="relative aspect-square">
          <Image
            src={product.mainProductImage || 'https://static.wixstatic.com/media/7d1d95_b4df2eac46464835918d584824cf67c7~mv2.png?originWidth=256&originHeight=256'}
            alt={product.productName || 'Jewelry product'}
            className="w-full h-full object-cover"
            width={300}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {showVipBadge && product.isVipItem && (
              <Badge className="bg-light-gold text-white">
                <Crown className="h-3 w-3 mr-1" />
                VIP
              </Badge>
            )}
            {product.moderationStatus === 'approved' && (
              <Badge className="bg-green-100 text-green-800">
                Verified
              </Badge>
            )}
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
            <Link to={`/product/${product._id}`}>
              <Button size="sm" variant="secondary">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2">
            {product.productName || 'Untitled Product'}
          </h3>
          
          {product.sku && (
            <p className="font-paragraph text-xs text-dark-grey mb-2">
              SKU: {product.sku}
            </p>
          )}

          <p className="font-paragraph text-sm text-dark-grey mb-3 line-clamp-2">
            {product.description || 'No description available.'}
          </p>

          {/* Price and Rating */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-lg font-heading font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-paragraph text-sm text-dark-grey ml-1">4.8</span>
            </div>
          </div>

          {/* Visibility Indicators */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.isVisibleToPublic && (
              <div className="w-2 h-2 bg-blue-500 rounded-full" title="Public" />
            )}
            {product.isVisibleToRetailers && (
              <div className="w-2 h-2 bg-green-500 rounded-full" title="Retailers" />
            )}
            {product.isVisibleToWholesalers && (
              <div className="w-2 h-2 bg-purple-500 rounded-full" title="Wholesalers" />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link to={`/product/${product._id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View
              </Button>
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}