'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../../../assets/favicon.svg';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Formik form initialization with Yup validation
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
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setError('');
      setIsLoading(true);
      try {
        const response = await axios.post('/api/admin/auth/login', {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          // Store the JWT token in localStorage
          const token = response.data.token;
          const email = response.data.email;
          localStorage.setItem('admin_token', token);
          localStorage.setItem('admin_email', email);
          // console.log('Admin email is:', email);

          // Log the token to confirm it's being retrieved correctly
          // console.log('Admin token is:', token);

          // Redirect to admin dashboard
          router.push('/admin/overview');
          toast.success('Admin Login Successful!', {
            duration: 4000, // Toast shows for 4 seconds
          });
        } else if (response.status === 403) {
          setError('Your account is pending approval by the owner.');
        } else {
          setError('Invalid login credentials.');
        }
      } catch (err) {
        setError('Invalid login credentials');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="hidden items-center justify-start space-x-1 px-4 py-4 lg:flex">
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <h1 className="text-xl font-bold">ShopBuddy</h1>
      </div>

      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="max-w-sm rounded-lg bg-white p-6 shadow-md lg:max-w-lg">
          <h2 className="mb-4 text-center text-2xl font-bold">Admin Login</h2>
          <p className="mb-4">To access the dashboard, you have to log in</p>

          {error && <p className="text-red-500">{error}</p>}

          {/* Formik form */}
          <form onSubmit={formik.handleSubmit}>
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

            <div className="relative mb-4">
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

            <button
              type="submit"
              className="w-full bg-button py-2 text-white hover:bg-blue-500"
              disabled={isLoading || formik.isSubmitting}
            >
              {isLoading ? 'logging in...' : 'Login'}
            </button>
          </form>

          <p className="py-4 text-center text-sm">
            Create a new account if you are assigned as an admin
            <Link
              className="ml-2 text-blue-600 hover:underline"
              href="/adminAuth/auth/signup"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
