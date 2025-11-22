import { useState, useEffect, useRef } from 'react';
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

// Static curated featured products with luxury jewelry images
const STATIC_FEATURED_PRODUCTS: JewelryProducts[] = [
  {
    _id: 'featured-1',
    productName: 'Eternal Diamond Solitaire Ring',
    description: 'A timeless masterpiece featuring a 2.5-carat brilliant-cut diamond set in 18K white gold. This iconic ring represents the pinnacle of elegance and sophistication.',
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_37ecb9363ca2454a937c354eca8a8b69~mv2.png?originWidth=576&originHeight=576',
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
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_258633440e7141d3be1e976859faf980~mv2.png?originWidth=576&originHeight=576',
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
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_70af8f0eff30451a900230e65980e72b~mv2.png?originWidth=576&originHeight=576',
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
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_b5933206ec6540b38f200367a1b03d2f~mv2.png?originWidth=576&originHeight=576',
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
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_3b11be887ef445bba06f6148e531d50b~mv2.png?originWidth=576&originHeight=576',
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
    mainProductImage: 'https://static.wixstatic.com/media/7d1d95_40452589591745bba7918b9169939eb7~mv2.png?originWidth=576&originHeight=576',
    price: 22000,
    sku: 'TIARA-PEARL-001',
    moderationStatus: 'approved',
    isVipItem: true,
    isVisibleToPublic: true,
    isVisibleToWholesalers: true,
    isVisibleToRetailers: true,
  },
];

// 3D Perspective effect hook
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}

export default function HomePage() {
  const { member, isAuthenticated, actions } = useMember();
  const [featuredProducts, setFeaturedProducts] = useState<JewelryProducts[]>(STATIC_FEATURED_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<JewelryProducts | null>(STATIC_FEATURED_PRODUCTS[0]);
  const [loading, setLoading] = useState(false);
  const mousePosition = useMousePosition();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner Section - Full-Bleed with 3D Jewelry Showcase */}
      <section ref={heroRef} className="relative w-full h-screen max-h-[800px] overflow-hidden flex items-center justify-center perspective">
        {/* Background Image with Overlay and 3D Transform */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              rotateX: mousePosition.y * 5,
              rotateY: mousePosition.x * 5,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            className="w-full h-full origin-center"
            style={{ perspective: '1000px' }}
          >
            <Image
              src="https://static.wixstatic.com/media/7d1d95_0f768bebb08e415f99cf4ee0436d7fb4~mv2.png"
              alt="Luxury diamond and gold jewelry collection banner"
              className="w-full h-full object-cover"
              width={1920}
            />
          </motion.div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          
          {/* 3D Light effect overlay */}
          <motion.div
            animate={{
              background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(203, 179, 142, 0.15) 0%, transparent 50%)`
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            className="absolute inset-0 pointer-events-none"
          />
        </div>

        {/* 3D Jewelry Showcase - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: 45 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full flex items-center justify-center z-5 hidden lg:flex"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="relative w-96 h-96"
            style={{ perspective: '1000px' }}
          >
            {/* 3D Jewelry Product Display */}
            <motion.div
              className="relative w-full h-full"
              animate={{
                rotateX: mousePosition.y * 10,
                rotateY: mousePosition.x * 10,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            >
              {/* Outer glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-light-gold/30 via-transparent to-light-gold/20 rounded-full blur-3xl"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* 3D Jewelry Image Container */}
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                {/* Gradient background for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-light-gold/10 to-primary/20" />
                
                {/* Featured Jewelry Image with 3D effect */}
                <Image
                  src="https://static.wixstatic.com/media/7d1d95_37ecb9363ca2454a937c354eca8a8b69~mv2.png?originWidth=576&originHeight=576"
                  alt="3D Jewelry Showcase - Diamond Ring"
                  className="w-full h-full object-cover"
                  width={400}
                />

                {/* 3D Light reflection overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Rotating border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-light-gold via-white to-light-gold bg-clip-border"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
              </motion.div>

              {/* 3D Floating particles around jewelry */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-light-gold rounded-full"
                  animate={{
                    x: [0, Math.cos((i / 6) * Math.PI * 2) * 120, 0],
                    y: [0, Math.sin((i / 6) * Math.PI * 2) * 120, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </motion.div>

            {/* Product Info Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-4 w-80 shadow-2xl"
            >
              <h3 className="font-heading font-bold text-foreground mb-1">
                Eternal Diamond Solitaire
              </h3>
              <p className="font-paragraph text-sm text-dark-grey mb-3">
                2.5-carat brilliant-cut diamond in 18K white gold
              </p>
              <motion.div
                className="flex items-center justify-between"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-heading font-bold text-primary text-lg">$12,500</span>
                <Badge className="bg-light-gold text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP
                </Badge>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content Overlay with 3D Depth - Left Side */}
        <div className="relative z-10 max-w-[120rem] mx-auto px-6 lg:px-10 w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-2xl"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-block"
              >
                <Badge className="bg-light-gold/80 text-white border border-light-gold/60 mb-4 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <Sparkles className="h-3 w-3 mr-2 relative z-10" />
                  <span className="relative z-10">Luxury Jewelry Collection</span>
                </Badge>
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-6xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight relative"
              animate={{
                textShadow: [
                  '0 0 20px rgba(203, 179, 142, 0.3)',
                  '0 0 40px rgba(203, 179, 142, 0.5)',
                  '0 0 20px rgba(203, 179, 142, 0.3)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Timeless Elegance
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl font-paragraph text-white/90 mb-8 leading-relaxed max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Discover our exquisite collection of handcrafted diamond and gold jewelry. Each piece is a masterpiece of precision and artistry.
            </motion.p>

            {/* CTA Buttons with 3D Effect */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="flex-1 sm:flex-none">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <Button className="w-full sm:w-auto bg-light-gold hover:bg-light-gold/90 text-white px-8 py-4 text-lg font-medium relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center">
                      Explore Collection
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
              {!isAuthenticated && (
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={actions.login}
                    className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border border-white/40 px-8 py-4 text-lg font-medium backdrop-blur-sm relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <span className="relative z-10">Sign In</span>
                  </Button>
                </motion.div>
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
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <Card className="overflow-hidden relative">
                  {/* 3D Shadow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-light-gold/20 to-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  
                  {selectedProduct ? (
                    <div className="space-y-6">
                      {/* Main Product Image with 3D Viewer */}
                      <div className="relative aspect-square bg-gradient-to-br from-background to-secondary/20 overflow-hidden group">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={selectedProduct.mainProductImage || 'https://static.wixstatic.com/media/7d1d95_3272e5b08b9f497ba8bcde783defc34f~mv2.png?originWidth=576&originHeight=576'}
                            alt={selectedProduct.productName || 'Featured product'}
                            className="w-full h-full object-cover"
                            width={600}
                          />
                        </motion.div>
                        
                        {/* 3D Light reflection effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{
                            background: `linear-gradient(135deg, rgba(255,255,255,${0.1 + mousePosition.x * 0.05}) 0%, transparent 50%)`
                          }}
                        />
                        
                        {/* Badges with 3D effect */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {selectedProduct.isVipItem && (
                            <motion.div
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="relative"
                            >
                              <Badge className="bg-light-gold text-white relative overflow-hidden">
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                  animate={{ x: ['100%', '-100%'] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                                <Crown className="h-3 w-3 mr-1 relative z-10" />
                                <span className="relative z-10">VIP Exclusive</span>
                              </Badge>
                            </motion.div>
                          )}
                          {selectedProduct.moderationStatus === 'approved' && (
                            <motion.div
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              <Badge className="bg-green-100 text-green-800">
                                Verified
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Product Details with 3D depth */}
                      <div className="p-6 relative">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <h3 className="text-3xl font-heading font-bold text-foreground mb-3">
                            {selectedProduct.productName}
                          </h3>
                          
                          <motion.p 
                            className="text-2xl font-heading font-bold text-primary mb-4 relative inline-block"
                            animate={{
                              textShadow: [
                                '0 0 10px rgba(169, 141, 103, 0.3)',
                                '0 0 20px rgba(169, 141, 103, 0.5)',
                                '0 0 10px rgba(169, 141, 103, 0.3)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ${selectedProduct.price?.toLocaleString() || 'Price on request'}
                          </motion.p>

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
                              <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 relative overflow-hidden group">
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                    animate={{ x: ['100%', '-100%'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                  <Eye className="h-4 w-4 mr-2 relative z-10" />
                                  <span className="relative z-10">View Full Details</span>
                                </Button>
                              </motion.div>
                            </Link>
                            <motion.div
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 relative overflow-hidden">
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                                  animate={{ x: ['100%', '-100%'] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                />
                                <span className="relative z-10">Add to Wishlist</span>
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
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
            </motion.div>

            {/* Product Thumbnails with 3D effect */}
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
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all relative overflow-hidden group ${
                      selectedProduct?._id === product._id
                        ? 'border-primary bg-primary/5'
                        : 'border-secondary/20 hover:border-primary/50'
                    }`}
                  >
                    {/* 3D depth shadow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-light-gold/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    
                    <div className="flex gap-3 relative z-10">
                      <motion.div 
                        className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/10 relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        {/* 3D shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                          animate={{
                            background: `linear-gradient(135deg, rgba(255,255,255,${0.2 + index * 0.05}) 0%, transparent 50%)`
                          }}
                        />
                        <Image
                          src={product.mainProductImage || 'https://static.wixstatic.com/media/7d1d95_68493d27bc2f487c9b7080b61688a077~mv2.png?originWidth=128&originHeight=128'}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                          width={64}
                        />
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className="font-paragraph font-medium text-foreground truncate">
                          {product.productName}
                        </h5>
                        <motion.p 
                          className="font-paragraph text-sm text-primary font-semibold"
                          animate={{
                            textShadow: selectedProduct?._id === product._id 
                              ? '0 0 8px rgba(169, 141, 103, 0.4)'
                              : '0 0 0px rgba(169, 141, 103, 0)'
                          }}
                        >
                          ${product.price?.toLocaleString() || 'POA'}
                        </motion.p>
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
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center justify-center w-full">
                      View All Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </motion.div>
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

      {/* Product Grid Showcase with 3D Cards */}
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

      {/* Why Choose Us Section - Enhanced with 3D Cards */}
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
          {[
            {
              icon: Sparkles,
              title: 'Premium Quality',
              description: 'Every piece is carefully curated and authenticated to ensure the highest standards of craftsmanship and materials.',
              delay: 0.1,
            },
            {
              icon: Shield,
              title: 'Secure & Verified',
              description: 'All sellers and products undergo rigorous verification to guarantee authenticity, trust, and complete peace of mind.',
              delay: 0.2,
            },
            {
              icon: Gem,
              title: 'Expert Curation',
              description: 'Our team of jewelry experts hand-selects each piece to meet our exacting standards of beauty and value.',
              delay: 0.3,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-light-gold/20 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="bg-white p-8 rounded-lg border border-secondary/20 hover:border-light-gold/50 transition-all relative">
                <motion.div
                  className="bg-light-gold/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-light-gold/30 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      background: `linear-gradient(135deg, rgba(203,179,142,0.3) 0%, transparent 50%)`
                    }}
                  />
                  <item.icon className="h-7 w-7 text-light-gold relative z-10" />
                </motion.div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-paragraph text-dark-grey">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Premium Luxury with 3D Effects */}
      <section className="py-20 lg:py-32 px-6 lg:px-10 bg-gradient-to-br from-primary via-primary/90 to-light-gold/20 relative overflow-hidden">
        {/* Decorative 3D elements */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-light-gold/10 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, -10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        />

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
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="bg-light-gold hover:bg-light-gold/90 text-white px-8 py-4 text-lg relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center">
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
              {!isAuthenticated && (
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={actions.login}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-8 py-4 text-lg backdrop-blur-sm relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <span className="relative z-10">Create Account</span>
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
