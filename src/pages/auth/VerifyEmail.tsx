import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Activity, Mail, Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user, verifyEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Email sent!',
      description: 'Verification email has been resent.',
    });
    setIsResending(false);
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      await verifyEmail('mock-token');
      toast({
        title: 'Email verified!',
        description: 'Your account is now active.',
      });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Verification failed',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Verify your email</h2>
          <p className="text-muted-foreground mt-2">
            We've sent a verification link to{' '}
            <strong>{user?.email || 'your email address'}</strong>
          </p>
        </div>

        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Click the link in the email to verify your account. If you don't see the email,
            check your spam folder.
          </p>
        </div>

        <div className="space-y-3">
          {/* For demo purposes - simulate email verification */}
          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                I've verified my email (Demo)
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend verification email
              </>
            )}
          </Button>

          <Link to="/sign-in">
            <Button variant="ghost" className="w-full">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
