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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      {/* 3D Shadow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-light-gold/20 to-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      <Card className="overflow-hidden relative">
        {/* Image */}
        <div className="relative aspect-square group/image">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Image
              src={product.mainProductImage || 'https://static.wixstatic.com/media/7d1d95_b4df2eac46464835918d584824cf67c7~mv2.png?originWidth=256&originHeight=256'}
              alt={product.productName || 'Jewelry product'}
              className="w-full h-full object-cover"
              width={300}
            />
          </motion.div>
          
          {/* 3D Light reflection effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
            animate={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)`
            }}
          />
          
          {/* Badges with 3D effect */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {showVipBadge && product.isVipItem && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge className="bg-light-gold text-white relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Crown className="h-3 w-3 mr-1 relative z-10" />
                  <span className="relative z-10">VIP</span>
                </Badge>
              </motion.div>
            )}
            {product.moderationStatus === 'approved' && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge className="bg-green-100 text-green-800">
                  Verified
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Hover Actions with 3D effect */}
          <motion.div 
            className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2"
            animate={{
              background: 'rgba(0,0,0,0.5)'
            }}
          >
            <Link to={`/product/${product._id}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="sm" variant="secondary" className="relative overflow-hidden group/btn">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Eye className="h-4 w-4 relative z-10" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <ShoppingCart className="h-4 w-4 relative z-10" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Content with 3D depth */}
        <div className="p-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
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

            {/* Price and Rating with 3D glow */}
            <div className="flex justify-between items-center mb-3">
              <motion.p 
                className="text-lg font-heading font-bold text-primary relative"
                animate={{
                  textShadow: [
                    '0 0 8px rgba(169, 141, 103, 0.2)',
                    '0 0 16px rgba(169, 141, 103, 0.4)',
                    '0 0 8px rgba(169, 141, 103, 0.2)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {formatPrice(product.price)}
              </motion.p>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
              >
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-paragraph text-sm text-dark-grey ml-1">4.8</span>
              </motion.div>
            </div>

            {/* Visibility Indicators */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.isVisibleToPublic && (
                <motion.div 
                  className="w-2 h-2 bg-blue-500 rounded-full" 
                  title="Public"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {product.isVisibleToRetailers && (
                <motion.div 
                  className="w-2 h-2 bg-green-500 rounded-full" 
                  title="Retailers"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
              )}
              {product.isVisibleToWholesalers && (
                <motion.div 
                  className="w-2 h-2 bg-purple-500 rounded-full" 
                  title="Wholesalers"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
              )}
            </div>

            {/* Actions with 3D effect */}
            <div className="flex gap-2">
              <Link to={`/product/${product._id}`} className="flex-1">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10">View</span>
                  </Button>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <ShoppingCart className="h-4 w-4 relative z-10" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}