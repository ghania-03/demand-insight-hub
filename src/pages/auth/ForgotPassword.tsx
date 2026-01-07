import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity, Mail, Loader2, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast({
        title: 'Email sent!',
        description: 'Check your inbox for password reset instructions.',
      });
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Check your email</h2>
            <p className="text-muted-foreground mt-2">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
          </div>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Send again
            </Button>
            <Link to="/sign-in">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Forgot password?</h2>
          <p className="text-muted-foreground mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Reset password'
            )}
          </Button>
        </form>

        <Link to="/sign-in">
          <Button variant="ghost" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
