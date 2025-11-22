import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMember } from '@/integrations';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  Store, 
  ShoppingBag, 
  CheckCircle, 
  Upload,
  Eye,
  TrendingUp,
  Gem
} from 'lucide-react';

type UserRole = 'admin' | 'wholesaler' | 'premium-retailer' | 'intermediate-retailer' | 'public';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  badge?: string;
}

export default function AuthPage() {
  const { isAuthenticated, actions } = useMember();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<'role-selection' | 'onboarding'>('role-selection');

  // Get role from URL params if provided
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam) {
      switch (roleParam) {
        case 'wholesaler':
          setSelectedRole('wholesaler');
          break;
        case 'retailer':
          setSelectedRole('premium-retailer');
          break;
        case 'admin':
          setSelectedRole('admin');
          break;
        default:
          setSelectedRole('public');
      }
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const roleOptions: RoleOption[] = [
    {
      id: 'admin',
      title: 'Platform Administrator',
      description: 'Manage the entire platform, moderate content, and oversee operations',
      icon: <Shield className="h-8 w-8" />,
      features: [
        'Full platform access',
        'Content moderation tools',
        'User management',
        'Analytics dashboard',
        'System configuration'
      ],
      badge: 'Admin'
    },
    {
      id: 'wholesaler',
      title: 'Wholesale Partner',
      description: 'Upload products, manage inventory, and reach verified retailers',
      icon: <Users className="h-8 w-8" />,
      features: [
        'Product upload with AI enhancement',
        'Inventory management',
        'Retailer network access',
        'Bulk pricing tools',
        'Analytics & reporting'
      ],
      badge: 'B2B'
    },
    {
      id: 'premium-retailer',
      title: 'Premium Retailer',
      description: 'Access exclusive collections and premium features',
      icon: <Gem className="h-8 w-8" />,
      features: [
        'Exclusive product access',
        'Custom branding options',
        'Priority support',
        'Advanced analytics',
        'VIP pricing tiers'
      ],
      badge: 'Premium'
    },
    {
      id: 'intermediate-retailer',
      title: 'Intermediate Retailer',
      description: 'Standard retail access with essential business tools',
      icon: <Store className="h-8 w-8" />,
      features: [
        'Standard product catalog',
        'Basic branding options',
        'Order management',
        'Customer support',
        'Standard pricing'
      ]
    },
    {
      id: 'public',
      title: 'Public Customer',
      description: 'Browse and purchase from our curated jewelry collection',
      icon: <ShoppingBag className="h-8 w-8" />,
      features: [
        'Browse public catalog',
        'Purchase jewelry',
        'Order tracking',
        'Customer support',
        'Wishlist & favorites'
      ]
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('onboarding');
  };

  const handleContinue = () => {
    // In a real app, this would save the role to user profile
    actions.login();
  };

  const selectedRoleData = roleOptions.find(role => role.id === selectedRole);

  if (step === 'role-selection') {
    return (
      <div className="min-h-screen bg-background py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Choose Your Role
            </h1>
            <p className="text-lg font-paragraph text-dark-grey max-w-2xl mx-auto">
              Select the role that best describes your business needs. You can always upgrade or modify your access later.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleOptions.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                    selectedRole === role.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-secondary/20 hover:border-primary/50'
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      {role.icon}
                    </div>
                    {role.badge && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {role.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {role.title}
                  </h3>
                  
                  <p className="font-paragraph text-dark-grey mb-4">
                    {role.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm font-paragraph text-dark-grey">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <Button
                onClick={() => setStep('onboarding')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              >
                Continue as {selectedRoleData?.title}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Welcome, {selectedRoleData?.title}
          </h1>
          <p className="text-lg font-paragraph text-dark-grey max-w-2xl mx-auto">
            Let's get you set up with everything you need to succeed on our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary mr-4">
                  {selectedRoleData?.icon}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {selectedRoleData?.title}
                  </h3>
                  {selectedRoleData?.badge && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary mt-1">
                      {selectedRoleData.badge}
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="font-paragraph text-dark-grey mb-6">
                {selectedRoleData?.description}
              </p>
              
              <h4 className="font-heading font-semibold text-foreground mb-3">
                Your Access Includes:
              </h4>
              <ul className="space-y-2">
                {selectedRoleData?.features.map((feature, index) => (
                  <li key={index} className="flex items-center font-paragraph text-dark-grey">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
                What's Next?
              </h3>
              
              <div className="space-y-4">
                {selectedRole === 'wholesaler' && (
                  <>
                    <div className="flex items-start">
                      <Upload className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-paragraph font-medium text-foreground">Upload Products</h4>
                        <p className="font-paragraph text-sm text-dark-grey">
                          Start by uploading your jewelry collection with our AI-powered enhancement tools.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Eye className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-paragraph font-medium text-foreground">Moderation Review</h4>
                        <p className="font-paragraph text-sm text-dark-grey">
                          Our team will review and approve your products for the platform.
                        </p>
                      </div>
                    </div>
                  </>
                )}
                
                {(selectedRole === 'premium-retailer' || selectedRole === 'intermediate-retailer') && (
                  <>
                    <div className="flex items-start">
                      <Store className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-paragraph font-medium text-foreground">Browse Catalog</h4>
                        <p className="font-paragraph text-sm text-dark-grey">
                          Explore our curated collection of jewelry from verified wholesalers.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-paragraph font-medium text-foreground">Customize Branding</h4>
                        <p className="font-paragraph text-sm text-dark-grey">
                          Set up your brand presentation and pricing strategies.
                        </p>
                      </div>
                    </div>
                  </>
                )}
                
                {selectedRole === 'public' && (
                  <>
                    <div className="flex items-start">
                      <ShoppingBag className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-paragraph font-medium text-foreground">Start Shopping</h4>
                        <p className="font-paragraph text-sm text-dark-grey">
                          Browse our collection and find the perfect jewelry pieces.
                        </p>
                      </div>
                    </div>
                  </>
                )}
                
                {selectedRole === 'admin' && (
                  <>
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-paragraph font-medium text-foreground">Admin Dashboard</h4>
                        <p className="font-paragraph text-sm text-dark-grey">
                          Access the full administrative interface and moderation tools.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Button
            onClick={handleContinue}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
          >
            Complete Setup & Sign In
          </Button>
          
          <p className="font-paragraph text-sm text-dark-grey mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}