import { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ContactFormSubmissions } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from 'lucide-react';

interface ContactForm {
  senderName: string;
  senderEmail: string;
  subject: string;
  messageContent: string;
}

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    senderName: '',
    senderEmail: '',
    subject: '',
    messageContent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.senderName || !formData.senderEmail || !formData.messageContent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submission: Partial<ContactFormSubmissions> = {
        _id: crypto.randomUUID(),
        senderName: formData.senderName,
        senderEmail: formData.senderEmail,
        subject: formData.subject || 'General Inquiry',
        messageContent: formData.messageContent,
        submissionDate: new Date().toISOString(),
        status: 'pending'
      };

      await BaseCrudService.create('contactsubmissions', submission as any);
      
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        senderName: '',
        senderEmail: '',
        subject: '',
        messageContent: ''
      });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get in Touch
            </h1>
            <p className="text-lg font-paragraph text-dark-grey max-w-2xl mx-auto">
              Have questions about our jewelry platform? We're here to help you succeed in your business.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[120rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="font-paragraph text-dark-grey mb-8">
                  Reach out to us through any of these channels. Our team is ready to assist you with your jewelry business needs.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-paragraph font-semibold text-foreground mb-1">
                      Email Us
                    </h3>
                    <p className="font-paragraph text-dark-grey">
                      support@luxejewels.com
                    </p>
                    <p className="font-paragraph text-dark-grey">
                      business@luxejewels.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-paragraph font-semibold text-foreground mb-1">
                      Call Us
                    </h3>
                    <p className="font-paragraph text-dark-grey">
                      +1 (555) 123-4567
                    </p>
                    <p className="font-paragraph text-dark-grey">
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-paragraph font-semibold text-foreground mb-1">
                      Visit Us
                    </h3>
                    <p className="font-paragraph text-dark-grey">
                      123 Jewelry District<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-paragraph font-semibold text-foreground mb-1">
                      Business Hours
                    </h3>
                    <p className="font-paragraph text-dark-grey">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Categories */}
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  How Can We Help?
                </h3>
                <ul className="space-y-2 font-paragraph text-sm text-dark-grey">
                  <li>• Platform onboarding and setup</li>
                  <li>• Product upload and management</li>
                  <li>• Technical support and troubleshooting</li>
                  <li>• Business partnership inquiries</li>
                  <li>• Billing and subscription questions</li>
                  <li>• General platform feedback</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-paragraph text-dark-grey mb-6">
                    Thank you for reaching out to us. Our team will review your message and get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                      Send Us a Message
                    </h2>
                    <p className="font-paragraph text-dark-grey">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="senderName" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                          Full Name *
                        </Label>
                        <Input
                          id="senderName"
                          value={formData.senderName}
                          onChange={(e) => handleInputChange('senderName', e.target.value)}
                          placeholder="Enter your full name"
                          className="font-paragraph"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="senderEmail" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          id="senderEmail"
                          type="email"
                          value={formData.senderEmail}
                          onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                          placeholder="Enter your email address"
                          className="font-paragraph"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="What is this regarding?"
                        className="font-paragraph"
                      />
                    </div>

                    <div>
                      <Label htmlFor="messageContent" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="messageContent"
                        value={formData.messageContent}
                        onChange={(e) => handleInputChange('messageContent', e.target.value)}
                        placeholder="Please describe how we can help you..."
                        rows={6}
                        className="font-paragraph"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                      
                      <p className="font-paragraph text-xs text-dark-grey">
                        * Required fields
                      </p>
                    </div>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-paragraph text-dark-grey max-w-2xl mx-auto">
              Find quick answers to common questions about our platform and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">
                How do I get started as a wholesaler?
              </h3>
              <p className="font-paragraph text-dark-grey">
                Simply sign up for an account, select "Wholesaler" as your role, and follow our onboarding process. You'll be able to upload products immediately, though they'll need approval before going live.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">
                What are the fees for using the platform?
              </h3>
              <p className="font-paragraph text-dark-grey">
                We offer flexible pricing plans based on your business size and needs. Contact our sales team for detailed pricing information and custom enterprise solutions.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">
                How long does product approval take?
              </h3>
              <p className="font-paragraph text-dark-grey">
                Our moderation team typically reviews and approves products within 24-48 hours. Premium members receive priority review with faster approval times.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">
                Can I customize my product presentations?
              </h3>
              <p className="font-paragraph text-dark-grey">
                Yes! Retailers can customize product presentations with their own branding, pricing, and marketing materials while maintaining the original product quality and authenticity.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}