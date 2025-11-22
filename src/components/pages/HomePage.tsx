import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ArrowRight, Shield, Users, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { member, isAuthenticated, actions } = useMember();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - The Asymmetric Reveal */}
      <section className="h-screen grid place-items-center px-10 max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-foreground mb-6">
              Exquisite Jewelry for Every Occasion
            </h1>
            <p className="text-lg lg:text-xl font-paragraph text-dark-grey mb-8 leading-relaxed">
              Discover our curated collection of premium jewelry. From wholesale partnerships to retail excellence, 
              we serve every tier of the luxury market with uncompromising quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={actions.login}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Link to="/catalog">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
                >
                  Browse Catalog
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="flex justify-center items-center"
          >
            <Image
              src="https://static.wixstatic.com/media/7d1d95_1c6d7b2d39ab4b5499eb9ef806dba077~mv2.png?originWidth=576&originHeight=448"
              alt="Exquisite jewelry collection featuring elegant rings, necklaces, and earrings"
              className="w-full max-w-lg object-cover rounded-lg shadow-xl"
              width={600}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-10 max-w-[100rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Tailored for Every Business Model
          </h2>
          <p className="text-lg font-paragraph text-dark-grey max-w-3xl mx-auto">
            Our platform serves the entire jewelry ecosystem, from wholesale suppliers to premium retailers, 
            with specialized tools and experiences for each role.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              Wholesale Partners
            </h3>
            <p className="font-paragraph text-dark-grey mb-6">
              Upload products with AI-powered enhancement, manage inventory, and reach verified retailers through our platform.
            </p>
            <Link to="/auth?role=wholesaler">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Join as Wholesaler
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              Premium Retailers
            </h3>
            <p className="font-paragraph text-dark-grey mb-6">
              Access exclusive collections, customize product presentations with your branding, and manage your retail operations.
            </p>
            <Link to="/auth?role=retailer">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Become Retailer
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gem className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              Public Customers
            </h3>
            <p className="font-paragraph text-dark-grey mb-6">
              Discover and purchase exquisite jewelry pieces from our curated collection of verified suppliers and retailers.
            </p>
            <Link to="/catalog">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-10 bg-primary/5">
        <div className="max-w-[100rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Ready to Transform Your Jewelry Business?
            </h2>
            <p className="text-lg font-paragraph text-dark-grey mb-8 max-w-2xl mx-auto">
              Join thousands of jewelry professionals who trust our platform for their business growth.
            </p>
            {!isAuthenticated && (
              <Button 
                onClick={actions.login}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}