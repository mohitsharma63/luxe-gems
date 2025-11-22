import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { JewelryProducts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ProductCard } from '@/components/ui/product-card';
import { ThreeDViewer } from '@/components/ui/three-d-viewer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowRight, Shield, Users, Gem, Sparkles, Crown, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Static curated featured products
const STATIC_FEATURED_PRODUCTS: JewelryProducts[] = [
  {
    _id: 'featured-1',
    productName: 'Eternal Diamond Solitaire Ring',
    description: 'A timeless masterpiece featuring a 2.5-carat brilliant-cut diamond set in 18K white gold. This iconic ring represents the pinnacle of elegance and sophistication.',
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_a1b2c3d4e5f6g7h8i9j0k1l2~mv2.png?originWidth=600&originHeight=600',
    price: 12500,
    sku: 'RING-ETERNAL-001',
    moderationStatus: 'approved',
    isVipItem: true,
    isVisibleToPublic: true,
    isVisibleToWholesalers: true,
    isVisibleToRetailers: true,
  },
  {
    _id: 'featured-2',
    productName: 'Luxe Gold Pendant Necklace',
    description: 'An exquisite 18K yellow gold pendant adorned with a stunning sapphire center stone. Each piece is hand-crafted by master artisans with meticulous attention to detail.',
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_b2c3d4e5f6g7h8i9j0k1l2m3~mv2.png?originWidth=600&originHeight=600',
    price: 8750,
    sku: 'NECKLACE-LUXE-001',
    moderationStatus: 'approved',
    isVipItem: true,
    isVisibleToPublic: true,
    isVisibleToWholesalers: true,
    isVisibleToRetailers: true,
  },
  {
    _id: 'featured-3',
    productName: 'Diamond Tennis Bracelet',
    description: 'A stunning tennis bracelet featuring 15 carats of brilliant-cut diamonds set in platinum. The perfect accessory for any occasion, radiating unparalleled brilliance.',
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_c3d4e5f6g7h8i9j0k1l2m3n4~mv2.png?originWidth=600&originHeight=600',
    price: 18900,
    sku: 'BRACELET-TENNIS-001',
    moderationStatus: 'approved',
    isVipItem: true,
    isVisibleToPublic: true,
    isVisibleToWholesalers: true,
    isVisibleToRetailers: true,
  },
  {
    _id: 'featured-4',
    productName: 'Emerald & Diamond Earrings',
    description: 'Elegant drop earrings featuring 2-carat emeralds surrounded by a halo of brilliant diamonds. A sophisticated choice for the discerning collector.',
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_d4e5f6g7h8i9j0k1l2m3n4o5~mv2.png?originWidth=600&originHeight=600',
    price: 9200,
    sku: 'EARRINGS-EMERALD-001',
    moderationStatus: 'approved',
    isVipItem: false,
    isVisibleToPublic: true,
    isVisibleToWholesalers: true,
    isVisibleToRetailers: true,
  },
  {
    _id: 'featured-5',
    productName: 'Vintage Gold Brooch',
    description: 'A stunning vintage-inspired brooch crafted in 14K rose gold with intricate filigree detailing. A timeless accent piece for any jewelry collection.',
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_e5f6g7h8i9j0k1l2m3n4o5p6~mv2.png?originWidth=600&originHeight=600',
    price: 4500,
    sku: 'BROOCH-VINTAGE-001',
    moderationStatus: 'approved',
    isVipItem: false,
    isVisibleToPublic: true,
    isVisibleToWholesalers: true,
    isVisibleToRetailers: true,
  },
  {
    _id: 'featured-6',
    productName: 'Pearl & Diamond Tiara',
    description: 'An exquisite tiara featuring lustrous South Sea pearls and brilliant diamonds set in 18K white gold. Perfect for special occasions and celebrations.',
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_f6g7h8i9j0k1l2m3n4o5p6q7~mv2.png?originWidth=600&originHeight=600',
    price: 22000,
    sku: 'TIARA-PEARL-001',
    moderationStatus: 'approved',
    isVipItem: true,
    isVisibleToPublic: true,
    isVisibleToWholesalers: true,
    isVisibleToRetailers: true,
  },
];

export default function HomePage() {
  const { member, isAuthenticated, actions } = useMember();
  const [featuredProducts, setFeaturedProducts] = useState<JewelryProducts[]>(STATIC_FEATURED_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<JewelryProducts | null>(STATIC_FEATURED_PRODUCTS[0]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner Section - Full-Bleed Luxury Image */}
      <section className="relative w-full h-screen max-h-[800px] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/7d1d95_0f768bebb08e415f99cf4ee0436d7fb4~mv2.png"
            alt="Luxury diamond and gold jewelry collection banner"
            className="w-full h-full object-cover"
            width={1920}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-[120rem] mx-auto px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <Badge className="bg-light-gold/80 text-white border border-light-gold/60 mb-4">
                <Sparkles className="h-3 w-3 mr-2" />
                Luxury Jewelry Collection
              </Badge>
            </motion.div>

            <h1 className="text-6xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Timeless Elegance
            </h1>
            
            <p className="text-xl lg:text-2xl font-paragraph text-white/90 mb-8 leading-relaxed max-w-xl drop-shadow-md">
              Discover our exquisite collection of handcrafted diamond and gold jewelry. Each piece is a masterpiece of precision and artistry.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="flex-1 sm:flex-none">
                <Button className="w-full sm:w-auto bg-light-gold hover:bg-light-gold/90 text-white px-8 py-4 text-lg font-medium shadow-lg">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {!isAuthenticated && (
                <Button 
                  onClick={actions.login}
                  className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border border-white/40 px-8 py-4 text-lg font-medium backdrop-blur-sm"
                >
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="text-white/60 text-center">
            <p className="text-sm font-paragraph mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Products with 3D Viewer Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-10 max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-light-gold/20 text-primary border border-light-gold/40 mb-4 inline-block">
            <Gem className="h-3 w-3 mr-2 inline" />
            Premium Selection
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Featured Collection
          </h2>
          <p className="text-lg font-paragraph text-dark-grey max-w-2xl mx-auto">
            Handpicked pieces from our most exquisite collection, curated for discerning tastes.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* 3D Viewer and Product Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden">
                {selectedProduct ? (
                  <div className="space-y-6">
                    {/* Main Product Image with 3D Viewer */}
                    <div className="relative aspect-square bg-gradient-to-br from-background to-secondary/20 overflow-hidden">
                      <Image
                        src={selectedProduct.mainProductImage || 'https://static.wixstatic.com/media/7d1d95_3272e5b08b9f497ba8bcde783defc34f~mv2.png?originWidth=576&originHeight=576'}
                        alt={selectedProduct.productName || 'Featured product'}
                        className="w-full h-full object-cover"
                        width={600}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {selectedProduct.isVipItem && (
                          <Badge className="bg-light-gold text-white">
                            <Crown className="h-3 w-3 mr-1" />
                            VIP Exclusive
                          </Badge>
                        )}
                        {selectedProduct.moderationStatus === 'approved' && (
                          <Badge className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <h3 className="text-3xl font-heading font-bold text-foreground mb-3">
                        {selectedProduct.productName}
                      </h3>
                      
                      <p className="text-2xl font-heading font-bold text-primary mb-4">
                        ${selectedProduct.price?.toLocaleString() || 'Price on request'}
                      </p>

                      <p className="font-paragraph text-dark-grey mb-6 leading-relaxed">
                        {selectedProduct.description}
                      </p>

                      {selectedProduct.sku && (
                        <p className="font-paragraph text-sm text-dark-grey mb-6">
                          SKU: {selectedProduct.sku}
                        </p>
                      )}

                      <div className="flex gap-3">
                        <Link to={`/product/${selectedProduct._id}`} className="flex-1">
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Details
                          </Button>
                        </Link>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3">
                          Add to Wishlist
                        </Button>
                      </div>
                    </div>

                    {/* 3D Model Viewer */}
                    {selectedProduct.threeDModelUrl && (
                      <div className="border-t border-secondary/20 p-6">
                        <h4 className="font-heading font-semibold text-foreground mb-4">
                          Interactive 3D View
                        </h4>
                        <ThreeDViewer modelUrl={selectedProduct.threeDModelUrl} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="font-paragraph text-dark-grey">No products available</p>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Product Thumbnails */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-heading font-semibold text-foreground mb-4">
                More Pieces
              </h4>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {featuredProducts.map((product, index) => (
                  <motion.button
                    key={product._id}
                    onClick={() => setSelectedProduct(product)}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedProduct?._id === product._id
                        ? 'border-primary bg-primary/5'
                        : 'border-secondary/20 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/10">
                        <Image
                          src={product.mainProductImage || 'https://static.wixstatic.com/media/7d1d95_68493d27bc2f487c9b7080b61688a077~mv2.png?originWidth=128&originHeight=128'}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                          width={64}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className="font-paragraph font-medium text-foreground truncate">
                          {product.productName}
                        </h5>
                        <p className="font-paragraph text-sm text-primary font-semibold">
                          ${product.price?.toLocaleString() || 'POA'}
                        </p>
                        {product.isVipItem && (
                          <Badge className="mt-1 bg-light-gold/20 text-light-gold text-xs">
                            VIP
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <Link to="/catalog" className="block">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-paragraph text-dark-grey mb-6">No featured products available yet</p>
            <Link to="/catalog">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse Catalog
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Product Grid Showcase */}
      <section className="py-20 lg:py-32 px-6 lg:px-10 bg-gradient-to-br from-white via-background to-white">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-light-gold/20 text-primary border border-light-gold/40 mb-4 inline-block">
              <Crown className="h-3 w-3 mr-2 inline" />
              Curated Selection
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Premium Diamond & Gold Collection
            </h2>
            <p className="text-lg font-paragraph text-dark-grey max-w-2xl mx-auto">
              Explore our complete collection of premium jewelry pieces, each carefully selected for quality, design, and timeless elegance.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : featuredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} viewMode="grid" showVipBadge={true} />
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link to="/catalog">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                Explore Full Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="py-20 lg:py-32 px-6 lg:px-10 max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-light-gold/20 text-primary border border-light-gold/40 mb-4 inline-block">
            <Shield className="h-3 w-3 mr-2 inline" />
            Why LuxeJewels
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            The LuxeJewels Difference
          </h2>
          <p className="text-lg font-paragraph text-dark-grey max-w-2xl mx-auto">
            Experience the difference of working with a platform dedicated to luxury, authenticity, and excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg border border-secondary/20 hover:border-light-gold/50 transition-all hover:shadow-lg"
          >
            <div className="bg-light-gold/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="h-7 w-7 text-light-gold" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
              Premium Quality
            </h3>
            <p className="font-paragraph text-dark-grey">
              Every piece is carefully curated and authenticated to ensure the highest standards of craftsmanship and materials.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg border border-secondary/20 hover:border-light-gold/50 transition-all hover:shadow-lg"
          >
            <div className="bg-light-gold/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Shield className="h-7 w-7 text-light-gold" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
              Secure & Verified
            </h3>
            <p className="font-paragraph text-dark-grey">
              All sellers and products undergo rigorous verification to guarantee authenticity, trust, and complete peace of mind.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg border border-secondary/20 hover:border-light-gold/50 transition-all hover:shadow-lg"
          >
            <div className="bg-light-gold/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Gem className="h-7 w-7 text-light-gold" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
              Expert Curation
            </h3>
            <p className="font-paragraph text-dark-grey">
              Our team of jewelry experts hand-selects each piece to meet our exacting standards of beauty and value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Premium Luxury */}
      <section className="py-20 lg:py-32 px-6 lg:px-10 bg-gradient-to-br from-primary via-primary/90 to-light-gold/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-light-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="max-w-[100rem] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to Discover Your Perfect Piece?
            </h2>
            <p className="text-lg font-paragraph text-white/90 mb-8 max-w-2xl mx-auto">
              Join our community of jewelry enthusiasts and find the perfect addition to your collection. Experience luxury like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button className="bg-light-gold hover:bg-light-gold/90 text-white px-8 py-4 text-lg shadow-lg">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {!isAuthenticated && (
                <Button 
                  onClick={actions.login}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-8 py-4 text-lg backdrop-blur-sm"
                >
                  Create Account
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}