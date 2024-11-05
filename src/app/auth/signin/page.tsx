'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/app/components/Footer';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Icons for eye and loader
import Navbar from '@/app/components/NavBar';
import { signIn, useSession } from 'next-auth/react'; // Import signIn from NextAuth.js
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import toast from 'react-hot-toast';

const SignIn = () => {
  // State management for show/hide password and loading state
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false); // Loading state for login button
  const [loadingGoogle, setLoadingGoogle] = useState(false); // Loading state for Google login button
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error messages
  const router = useRouter(); // Get router instance
  const { status } = useSession(); // Get session status from NextAuth

  // Check if user is already authenticated
  if (status === 'authenticated') {
    router.push('/'); // Redirect to home if authenticated
    return null;
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission (login button)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoadingLogin(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error); // Set error message if login fails
    } else {
      router.push('/'); // Redirect to home if login is successful
      toast.success('Successfully signed in', {
        duration: 4000, // Toast shows for 4 seconds
      });
    }

    setLoadingLogin(false); // Reset loading state
  };

  // Handle Google login
  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    await signIn('google'); // Trigger Google sign-in
    setLoadingGoogle(false); // Reset loading state (you may want to handle loading state differently based on sign-in completion)
  };

  return (
    <>
      <div>
        <Navbar isAuthPage={true} />
      </div>
      <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[800px]">
        {/* Image Section */}
        <div className="bg-muted hidden lg:block">
          <Image
            src="/assets/signin.png"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>

        {/* Sign-In Form Section */}
        <div className="flex flex-col items-center justify-center py-24 lg:py-4">
          <div className="mx-auto grid w-[350px] gap-6">
            {/* Title & Subtitle */}
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground text-balance">
                Enter your email below to login to your account
              </p>
            </div>

            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input with Show/Hide Icon */}
            <div className="grid gap-2">
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-[35px] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Link
                href="/auth/forgot-password"
                className="ml-auto inline-block text-xs underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Login Button with Spinner */}
            <Button
              type="submit"
              className="w-full bg-button text-white hover:bg-blue-500"
              onClick={handleLogin}
              disabled={loadingLogin || loadingGoogle} // Disable if either button is loading
            >
              {loadingLogin ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center justify-center">
              <div className="h-px w-full bg-gray-300"></div>
              <div className="text-muted-foreground mx-4">Or</div>
              <div className="h-px w-full bg-gray-300"></div>
            </div>

            {/* Google Login Button with Logo */}
            <Button
              variant="outline"
              className="flex w-full items-center justify-center hover:bg-gray-100"
              onClick={handleGoogleSignIn}
              disabled={loadingGoogle || loadingLogin} // Disable if either button is loading
            >
              <Image
                src="/assets/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              {loadingGoogle ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Sign in with Google'
              )}
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SignIn;
