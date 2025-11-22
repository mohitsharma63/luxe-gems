import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { JewelryProducts } from '@/entities';
import { ProductCard } from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useMember } from '@/integrations';

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'price-low' | 'price-high' | 'newest';

export default function CatalogPage() {
  const { member, isAuthenticated } = useMember();
  const [products, setProducts] = useState<JewelryProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<JewelryProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, sortBy, priceRange]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { items } = await BaseCrudService.getAll<JewelryProducts>('jewelryproducts');
      
      // Filter products based on user role and visibility settings
      const visibleProducts = items.filter(product => {
        if (!isAuthenticated) {
          return product.isVisibleToPublic;
        }
        
        // For authenticated users, show products based on their role
        // In a real app, you'd get the user's role from their profile
        return product.isVisibleToPublic || product.isVisibleToRetailers || product.isVisibleToWholesalers;
      });
      
      setProducts(visibleProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.price || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.productName || '').localeCompare(b.productName || '');
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return new Date(b._createdDate || 0).getTime() - new Date(a._createdDate || 0).getTime();
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('newest');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 py-16 px-6">
        <div className="max-w-[120rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Jewelry Collection
            </h1>
            <p className="text-lg font-paragraph text-dark-grey max-w-2xl mx-auto">
              Discover our curated selection of exquisite jewelry pieces from verified suppliers and artisans.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-grey" />
              <Input
                placeholder="Search jewelry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-paragraph"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-48 font-paragraph">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {/* View Mode */}
              <div className="flex border border-secondary/20 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white p-6 rounded-lg border border-secondary/20 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                    Price Range
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="font-paragraph"
                    />
                    <span className="text-dark-grey">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="font-paragraph"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-secondary text-dark-grey hover:bg-secondary/10"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-paragraph text-dark-grey">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            
            {/* Active Filters */}
            <div className="flex items-center gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Search: {searchTerm}
                </Badge>
              )}
              {(priceRange.min > 0 || priceRange.max < 10000) && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Price: ${priceRange.min} - ${priceRange.max}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-paragraph text-dark-grey text-lg mb-4">
              No products found matching your criteria.
            </p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  viewMode={viewMode}
                  showVipBadge={product.isVipItem}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}