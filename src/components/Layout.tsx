import { useMember } from '@/integrations';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Bell, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function Layout() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Contact', href: '/contact' },
  ];

  const authenticatedNavigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Notifications', href: '/notifications' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary/20 sticky top-0 z-50">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-heading font-bold text-primary">
                LuxeJewels
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-paragraph text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-dark-grey'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated && authenticatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-paragraph text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-dark-grey'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {isLoading && <LoadingSpinner />}
              
              {!isAuthenticated && !isLoading && (
                <Button
                  onClick={actions.login}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign In
                </Button>
              )}

              {isAuthenticated && (
                <>
                  {/* Notifications */}
                  <Link
                    to="/notifications"
                    className="p-2 text-dark-grey hover:text-primary transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                  </Link>

                  {/* Profile Menu */}
                  <div className="relative group">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      {member?.profile?.photo?.url ? (
                        <Image src={member.profile.photo.url} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <span className="hidden lg:block font-paragraph text-sm font-medium text-dark-grey">
                        {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                      </span>
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm font-paragraph text-dark-grey hover:bg-primary/5 hover:text-primary"
                        >
                          Profile Settings
                        </Link>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm font-paragraph text-dark-grey hover:bg-primary/5 hover:text-primary"
                        >
                          Dashboard
                        </Link>
                        <hr className="my-2 border-secondary/20" />
                        <button
                          onClick={actions.logout}
                          className="block w-full text-left px-4 py-2 text-sm font-paragraph text-dark-grey hover:bg-destructive/5 hover:text-destructive"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-dark-grey hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-secondary/20"
            >
              <div className="px-6 py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block font-paragraph text-base font-medium transition-colors hover:text-primary ${
                      location.pathname === item.href
                        ? 'text-primary'
                        : 'text-dark-grey'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {isAuthenticated && authenticatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block font-paragraph text-base font-medium transition-colors hover:text-primary ${
                      location.pathname === item.href
                        ? 'text-primary'
                        : 'text-dark-grey'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {!isAuthenticated && (
                  <Button
                    onClick={() => {
                      actions.login();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-secondary/20 mt-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-2xl font-heading font-bold text-primary">
                  LuxeJewels
                </span>
              </Link>
              <p className="font-paragraph text-dark-grey mb-6 max-w-md">
                The premier B2B/B2C jewelry platform connecting wholesalers, retailers, and customers 
                with exquisite jewelry collections and cutting-edge technology.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Platform
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/catalog" className="font-paragraph text-dark-grey hover:text-primary transition-colors">
                    Browse Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/auth?role=wholesaler" className="font-paragraph text-dark-grey hover:text-primary transition-colors">
                    For Wholesalers
                  </Link>
                </li>
                <li>
                  <Link to="/auth?role=retailer" className="font-paragraph text-dark-grey hover:text-primary transition-colors">
                    For Retailers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="font-paragraph text-dark-grey hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="font-paragraph text-dark-grey hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="font-paragraph text-dark-grey hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-secondary/20" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-paragraph text-sm text-dark-grey">
              © 2024 LuxeJewels. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-dark-grey mt-2 md:mt-0">
              Crafted with precision and elegance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}