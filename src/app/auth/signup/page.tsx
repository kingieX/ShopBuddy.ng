'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Icons for eye and loader
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { useState } from 'react';

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

const SignUp = () => {
  // State management for show/hide password and loading state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission (login button)
  const handleLogin = () => {
    setLoading(true);
    // Simulate a delay for loading effect
    setTimeout(() => {
      setLoading(false);
      // Add actual login logic here
    }, 2000);
  };

  return (
    <>
      <Navbar isSignedIn={false} isAuthPage={true} profileImage="" />
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="bg-muted hidden lg:block">
          <Image
            src="/assets/signup.png"
            alt="Image"
            width={500}
            height={500}
            className="object-cove h-full w-full dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create account</h1>
              <p className="text-muted-foreground text-balance">
                Enter your information to create an account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Max" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Robinson" required />
                  </div>
                </div>
                {/* Email Input */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
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
                    />
                    {/* Eye Icon */}
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-[35px] cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                {/* Create account button */}
                <Button
                  type="submit"
                  className="w-full bg-button text-white hover:bg-blue-500"
                >
                  Create an account
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
                >
                  <Image
                    src="/assets/google-icon.svg" // Add the path to your Google logo
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Sign up with Google
                </Button>
              </div>
            </div>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/auth/signin" className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default SignUp;
