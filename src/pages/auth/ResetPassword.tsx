import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Activity, Lock, Loader2, AlertCircle, Eye, EyeOff, Check, X, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const token = searchParams.get('token') || 'mock-token';

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /\d/.test(password) },
  ];

  const passwordStrength = passwordRequirements.filter(r => r.met).length;
  const passwordStrengthPercent = (passwordStrength / passwordRequirements.length) * 100;

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-destructive';
    if (passwordStrength <= 2) return 'bg-warning';
    if (passwordStrength <= 3) return 'bg-info';
    return 'bg-success';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Password is too weak');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(token, password);
      setIsSubmitted(true);
      toast({
        title: 'Password reset!',
        description: 'Your password has been successfully reset.',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
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
            <h2 className="text-2xl font-bold text-foreground">Password reset successful</h2>
            <p className="text-muted-foreground mt-2">
              Your password has been reset. You can now sign in with your new password.
            </p>
          </div>
          <Link to="/sign-in">
            <Button className="w-full">Continue to sign in</Button>
          </Link>
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
          <h2 className="text-2xl font-bold text-foreground">Set new password</h2>
          <p className="text-muted-foreground mt-2">
            Your new password must be different from previously used passwords.
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
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && (
              <div className="space-y-2">
                <Progress value={passwordStrengthPercent} className={`h-1.5 ${getStrengthColor()}`} />
                <div className="grid grid-cols-2 gap-1">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      {req.met ? (
                        <Check className="w-3 h-3 text-success" />
                      ) : (
                        <X className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span className={req.met ? 'text-success' : 'text-muted-foreground'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-destructive">Passwords do not match</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Resetting...
              </>
            ) : (
              'Reset password'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
