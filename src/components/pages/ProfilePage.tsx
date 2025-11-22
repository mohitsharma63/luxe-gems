import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: member?.contact?.firstName || '',
    lastName: member?.contact?.lastName || '',
    nickname: member?.profile?.nickname || '',
    title: member?.profile?.title || '',
    phone: member?.contact?.phones?.[0] || '',
  });

  const handleSave = () => {
    // In a real app, this would update the member profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: member?.contact?.firstName || '',
      lastName: member?.contact?.lastName || '',
      nickname: member?.profile?.nickname || '',
      title: member?.profile?.title || '',
      phone: member?.contact?.phones?.[0] || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Profile Settings
          </h1>
          <p className="font-paragraph text-dark-grey">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <div className="text-center">
                {member?.profile?.photo?.url ? (
                  <Image src={member.profile.photo.url} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                )}
                
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                </h3>
                
                {member?.profile?.title && (
                  <p className="font-paragraph text-dark-grey mb-4">
                    {member.profile.title}
                  </p>
                )}
                
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {member?.status || 'Active'}
                </Badge>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm font-paragraph text-dark-grey">
                  <Mail className="h-4 w-4 mr-3 text-primary" />
                  {member?.loginEmail || 'No email provided'}
                </div>
                
                {member?.contact?.phones?.[0] && (
                  <div className="flex items-center text-sm font-paragraph text-dark-grey">
                    <Phone className="h-4 w-4 mr-3 text-primary" />
                    {member.contact.phones[0]}
                  </div>
                )}
                
                <div className="flex items-center text-sm font-paragraph text-dark-grey">
                  <Calendar className="h-4 w-4 mr-3 text-primary" />
                  Member since {member?._createdDate ? new Date(member._createdDate).toLocaleDateString() : 'Unknown'}
                </div>
                
                <div className="flex items-center text-sm font-paragraph text-dark-grey">
                  <Shield className="h-4 w-4 mr-3 text-primary" />
                  Email {member?.loginEmailVerified ? 'Verified' : 'Not Verified'}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Personal Information
                </h3>
                
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSave}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-secondary text-dark-grey hover:bg-secondary/10"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                    First Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="font-paragraph"
                    />
                  ) : (
                    <p className="font-paragraph text-dark-grey py-2">
                      {member?.contact?.firstName || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                    Last Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="font-paragraph"
                    />
                  ) : (
                    <p className="font-paragraph text-dark-grey py-2">
                      {member?.contact?.lastName || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="nickname" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                    Display Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="nickname"
                      value={formData.nickname}
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                      className="font-paragraph"
                    />
                  ) : (
                    <p className="font-paragraph text-dark-grey py-2">
                      {member?.profile?.nickname || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="font-paragraph"
                    />
                  ) : (
                    <p className="font-paragraph text-dark-grey py-2">
                      {member?.contact?.phones?.[0] || 'Not provided'}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="title" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                    Professional Title
                  </Label>
                  {isEditing ? (
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="font-paragraph"
                      placeholder="e.g., Jewelry Designer, Store Manager, etc."
                    />
                  ) : (
                    <p className="font-paragraph text-dark-grey py-2">
                      {member?.profile?.title || 'Not provided'}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="email" className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                    Email Address
                  </Label>
                  <p className="font-paragraph text-dark-grey py-2">
                    {member?.loginEmail || 'Not provided'}
                    {member?.loginEmailVerified && (
                      <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </p>
                  <p className="font-paragraph text-xs text-dark-grey mt-1">
                    Contact support to change your email address
                  </p>
                </div>
              </div>
            </Card>

            {/* Account Activity */}
            <Card className="p-6 mt-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                Account Activity
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                  <span className="font-paragraph text-dark-grey">Account Created</span>
                  <span className="font-paragraph text-foreground">
                    {member?._createdDate ? new Date(member._createdDate).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                  <span className="font-paragraph text-dark-grey">Last Updated</span>
                  <span className="font-paragraph text-foreground">
                    {member?._updatedDate ? new Date(member._updatedDate).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                  <span className="font-paragraph text-dark-grey">Last Login</span>
                  <span className="font-paragraph text-foreground">
                    {member?.lastLoginDate ? new Date(member.lastLoginDate).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="font-paragraph text-dark-grey">Account Status</span>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      member?.status === 'APPROVED' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {member?.status || 'Active'}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}