'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState('');

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .min(10, 'Phone number is too short')
        .max(15, 'Phone number is too long'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      setBackendError('');

      try {
        const formattedPhoneNo = values.phoneNumber.startsWith('+')
          ? values.phoneNumber
          : `+${values.phoneNumber}`;

        const formattedValues = {
          ...values,
          phoneNumber: formattedPhoneNo,
        };

        const response = await axios.post('/api/auth/signup', formattedValues);

        // Store the email in localStorage
        localStorage.setItem('userEmail', values.email);

        // Redirect to verification request page
        router.push('/auth/verify-request');
        toast.success('User registered successfully', {
          duration: 4000, // Toast shows for 4 seconds
        });
        console.log('User registered successfully', formattedValues);
      } catch (error) {
        if (
          (error as any).response &&
          (error as any).response.data &&
          (error as any).response.data.message
        ) {
          setBackendError((error as any).response.data.message);
        } else {
          setBackendError('Failed to sign up. Please try again.');
        }
        setErrors({
          email: 'Failed to sign up. Please check your email and try again.',
        });
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Navbar isAuthPage={true} />
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
        <div className="flex items-center justify-center py-24 lg:py-12">
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto grid w-[350px] gap-6"
          >
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create account</h1>
              <p className="text-muted-foreground text-balance">
                Enter your information to create an account
              </p>
            </div>

            {backendError && (
              <div className="mb-4 rounded border border-b-4 border-red-500 border-b-red-600 py-2 text-center text-sm text-red-500">
                {backendError}
              </div>
            )}

            <div className="grid gap-4">
              {/* First and Last Name */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    name="firstName"
                    placeholder="Max"
                    required
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    name="lastName"
                    placeholder="Robinson"
                    required
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* Phone */}
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <PhoneInput
                  country={'ng'} // Set default country
                  value={formik.values.phoneNumber}
                  onChange={(phoneNumber) =>
                    formik.setFieldValue('phoneNumber', phoneNumber)
                  }
                  onBlur={formik.handleBlur}
                  inputProps={{
                    name: 'phoneNumber',
                    required: true,
                    autoFocus: false,
                  }}
                  inputStyle={{ width: '100%' }}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-[35px] cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-button text-white hover:bg-blue-500"
                disabled={loading || formik.isSubmitting}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Create an account'
                )}
              </Button>
            </div>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="text-sm text-blue-500 underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
