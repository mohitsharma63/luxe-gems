import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { JewelryProducts, Notifications } from '@/entities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Package, 
  TrendingUp, 
  Users, 
  Eye, 
  Plus, 
  Bell,
  BarChart3,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

interface DashboardStats {
  totalProducts: number;
  pendingApproval: number;
  totalViews: number;
  totalSales: number;
}

export default function DashboardPage() {
  const { member } = useMember();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    pendingApproval: 0,
    totalViews: 0,
    totalSales: 0
  });
  const [recentProducts, setRecentProducts] = useState<JewelryProducts[]>([]);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const { items: products } = await BaseCrudService.getAll<JewelryProducts>('jewelryproducts');
      
      // Fetch notifications
      const { items: notificationItems } = await BaseCrudService.getAll<Notifications>('notifications');
      
      // Calculate stats
      const pendingCount = products.filter(p => p.moderationStatus === 'pending').length;
      
      setStats({
        totalProducts: products.length,
        pendingApproval: pendingCount,
        totalViews: Math.floor(Math.random() * 10000) + 1000, // Mock data
        totalSales: Math.floor(Math.random() * 50000) + 5000 // Mock data
      });
      
      // Get recent products (last 5)
      const recent = products
        .sort((a, b) => new Date(b._createdDate || 0).getTime() - new Date(a._createdDate || 0).getTime())
        .slice(0, 5);
      setRecentProducts(recent);
      
      // Get recent notifications
      const recentNotifications = notificationItems
        .sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime())
        .slice(0, 5);
      setNotifications(recentNotifications);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserRole = () => {
    // In a real app, this would come from user profile
    return 'Wholesaler'; // Mock role
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
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            {getGreeting()}, {member?.profile?.nickname || member?.contact?.firstName || 'User'}!
          </h1>
          <p className="font-paragraph text-dark-grey">
            Welcome to your {getUserRole()} dashboard. Here's what's happening with your business.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            <Link to="/upload">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Upload Product
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </Link>
            <Link to="/moderation">
              <Button variant="outline" className="border-secondary text-dark-grey hover:bg-secondary/10">
                <CheckCircle className="h-4 w-4 mr-2" />
                Moderation Queue
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-paragraph text-sm text-dark-grey mb-1">Total Products</p>
                <p className="text-2xl font-heading font-bold text-foreground">{stats.totalProducts}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-paragraph text-sm text-dark-grey mb-1">Pending Approval</p>
                <p className="text-2xl font-heading font-bold text-foreground">{stats.pendingApproval}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-paragraph text-sm text-dark-grey mb-1">Total Views</p>
                <p className="text-2xl font-heading font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-paragraph text-sm text-dark-grey mb-1">Revenue</p>
                <p className="text-2xl font-heading font-bold text-foreground">${stats.totalSales.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Products */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Recent Products
                </h3>
                <Link to="/catalog">
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    View All
                  </Button>
                </Link>
              </div>

              {recentProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 text-dark-grey mx-auto mb-4" />
                  <p className="font-paragraph text-dark-grey mb-4">
                    No products uploaded yet
                  </p>
                  <Link to="/upload">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Upload Your First Product
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product._id} className="flex items-center gap-4 p-4 border border-secondary/20 rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {product.mainProductImage ? (
                          <Image src={product.mainProductImage} alt={product.productName} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Package className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-paragraph font-medium text-foreground truncate">
                          {product.productName || 'Untitled Product'}
                        </h4>
                        <p className="font-paragraph text-sm text-dark-grey">
                          SKU: {product.sku || 'N/A'}
                        </p>
                        <p className="font-paragraph text-sm text-dark-grey">
                          {product.price ? `$${product.price.toLocaleString()}` : 'Price not set'}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`${
                            product.moderationStatus === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : product.moderationStatus === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.moderationStatus || 'Pending'}
                        </Badge>
                        <Link to={`/product/${product._id}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Notifications
                </h3>
                <Link to="/notifications">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    <Bell className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-dark-grey mx-auto mb-4" />
                  <p className="font-paragraph text-dark-grey">
                    No new notifications
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification._id} className="p-4 border border-secondary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                          {notification.title?.includes('approved') ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : notification.title?.includes('rejected') ? (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Bell className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-paragraph font-medium text-foreground text-sm">
                            {notification.title || 'Notification'}
                          </h4>
                          <p className="font-paragraph text-xs text-dark-grey mt-1 line-clamp-2">
                            {notification.content || 'No content available'}
                          </p>
                          <p className="font-paragraph text-xs text-dark-grey mt-2">
                            {notification.timestamp 
                              ? new Date(notification.timestamp).toLocaleDateString()
                              : 'No date'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}