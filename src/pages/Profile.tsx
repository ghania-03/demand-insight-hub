import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Shield, Camera, Loader2, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    updateProfile({
      name: formData.name,
      email: formData.email,
      role: formData.role,
    });

    toast({
      title: 'Profile updated',
      description: 'Your profile has been saved successfully.',
    });
    setIsLoading(false);
  };

  const handleAvatarChange = () => {
    const seeds = ['admin', 'user', 'dev', 'manager', 'analyst', 'john', 'jane', 'alex'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    updateProfile({
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`,
    });
    toast({
      title: 'Avatar updated',
      description: 'Your profile picture has been changed.',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        {/* Page Header */}
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            My Profile
          </h2>
          <p className="text-muted-foreground mt-1">Manage your account information</p>
        </div>

        {/* Avatar Section */}
        <div className="bg-card rounded-xl border p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-2xl">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarChange}
                className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{user?.name || 'User'}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Shield className="w-3 h-3" />
                {user?.role || 'User'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-card rounded-xl border p-6 space-y-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="pl-10"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="pl-10"
                    placeholder="Admin"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your role determines your access level within the organization.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
