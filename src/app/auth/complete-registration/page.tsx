'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/NavBar';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CompleteRegistration = () => {
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if there's no session data (user not authenticated)
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin'); // Redirect to sign-in page if no session
    }
  }, [status, router]);

  // Set initial values for the form when session is available
  const googleEmail = session?.user?.email || '';

  // Formik setup for the registration completion form
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: googleEmail,
      phoneNumber: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .min(10, 'Phone number is too short')
        .max(15, 'Phone number is too long'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
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

        console.log('Formatted values: ', formattedValues);

        const response = await axios.post(
          '/api/auth/complete-registration',
          formattedValues
        );

        if (response.status === 200) {
          toast.success('Registration complete!', {
            duration: 4000,
          });
          router.push('/');
        }
        console.log('Response: ', response.data);
      } catch (error) {
        toast.error('Something went wrong. Please try again.');
        setBackendError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar isAuthPage={true} />
      <div className="w-full py-12">
        <div className="mx-auto mt-12 w-full max-w-md border p-4">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Complete Your Registration
          </h1>

          {backendError && (
            <div className="mb-4 rounded border border-b-4 border-red-500 border-b-red-600 py-2 text-center text-sm text-red-500">
              {backendError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your last name"
              />
            </div>

            {/* Email pre-filled */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                disabled
              />
            </div>

            {/* Phone number */}
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
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
            </div>

            {/* Password */}
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
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
            </div>

            <Button
              type="submit"
              className="w-full bg-button text-white hover:bg-blue-500"
              disabled={loading || formik.isSubmitting}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Complete Registration'
              )}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompleteRegistration;
