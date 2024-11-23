'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Logo from '../../../assets/logo.png'; // Adjust the path as necessary

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
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      setBackendError('');

      try {
        const response = await axios.post('/api/admin/auth/register', values);

        // Redirect to verification request page
        router.push('/adminAuth/auth/login');
        console.log('Response data is:', response.data);

        toast.success('Registration successful. Awaiting approval.', {
          duration: 4000, // Toast shows for 4 seconds
        });
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
    <div className="flex h-screen w-full flex-col bg-gray-100">
      <div className="flex w-full items-center justify-center px-4 py-4 lg:justify-start">
        <Image
          src={Logo}
          alt="Logo"
          width={1500}
          height={1500}
          className="w-24 lg:w-32"
        />
      </div>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="max-w-sm rounded-lg bg-white p-6 shadow-md lg:max-w-lg">
          <h2 className="mb-4 text-center text-2xl font-bold">
            Admin Registration
          </h2>
          <p className="mb-4">
            Please fill in the details to register as an admin
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto grid w-[350px] gap-6"
          >
            {backendError && (
              <div className="mb-4 rounded border border-b-4 border-red-500 border-b-red-600 py-2 text-center text-sm text-red-500">
                {backendError}
              </div>
            )}

            <div className="grid gap-4">
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
          </form>

          <p className="py-4 text-center text-sm">
            Already have an account?
            <Link
              className="ml-2 text-button hover:underline"
              href="/adminAuth/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
