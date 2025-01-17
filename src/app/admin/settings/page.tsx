'use client';
import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import AdminLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const Settings = () => {
  // State to control the modal visibility
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const email = localStorage.getItem('admin_email');
  // console.log(email);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('admin_token'); // Remove the token
    localStorage.removeItem('admin_email'); // Remove the email
    router.push('/adminAuth/auth/login'); // Redirect to login page
  };

  // Formik form initialization with Yup validation
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old password is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
        .required('Please confirm your new password'),
    }),
    onSubmit: async (values) => {
      setError('');
      setIsLoading(true);
      setSuccess('');
      try {
        const token = localStorage.getItem('admin_token');

        const response = await axios.post('/api/admin/auth/change-password', {
          email,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          token,
        });

        if (response.status === 200) {
          setSuccess('Password successfully changed');
          toast.success('Password successfully changed!', {
            duration: 4000, // Toast shows for 4 seconds
          });
          setOpen(false);
          formik.resetForm();
        }
      } catch (error) {
        setError('Failed to change password. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <header className="stick z-5 top-0 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Settings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="bg-muted/40 flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl">
          <div className="grid w-full gap-6">
            {/* User Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle>User Profile Settings</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Email Address"
                    type="email"
                    value={email ?? ''}
                    disabled
                  />
                  {/* Trigger for Password Change Modal */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent button from submitting the form
                        setOpen(true);
                      }}
                    >
                      Change Password
                    </Button>
                  </div>
                </form>
              </CardContent>
              {/* <CardFooter className="border-t px-6 py-4">
                <Button className="bg-button text-white hover:bg-blue-600">
                  Save
                </Button>
              </CardFooter> */}
            </Card>

            {/* Notifications Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notifications Settings</CardTitle>
                <CardDescription>
                  Manage your email and SMS notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-notifications" />
                    <label htmlFor="email-notifications">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sms-notifications" />
                    <label htmlFor="sms-notifications">SMS Notifications</label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button className="bg-button text-white hover:bg-blue-600">
                  Save
                </Button>
              </CardFooter>
            </Card>

            {/* Security Settings */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Enhance your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="2fa" />
                    <label htmlFor="2fa">
                      Enable Two-Factor Authentication (2FA)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">View Login Activity</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button className="bg-button text-white hover:bg-blue-600">
                  Save
                </Button>
              </CardFooter>
            </Card> */}

            {/* Logout */}
            <Card>
              <CardFooter className="px-6 py-4">
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white hover:bg-red-400"
                >
                  Logout
                </Button>
              </CardFooter>
            </Card>

            {/* Password Change Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="password"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Old Password"
                    className={`mb-4 w-full border p-2 ${formik.touched.oldPassword && formik.errors.oldPassword ? 'border-red-500' : ''}`}
                  />
                  {formik.touched.oldPassword && formik.errors.oldPassword && (
                    <p className="text-red-500">{formik.errors.oldPassword}</p>
                  )}

                  <input
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="New Password"
                    className={`mb-4 w-full border p-2 ${formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : ''}`}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <p className="text-red-500">{formik.errors.newPassword}</p>
                  )}

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Confirm New Password"
                    className={`mb-4 w-full border p-2 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-red-500">
                        {formik.errors.confirmPassword}
                      </p>
                    )}

                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      {/* Save Changes */}
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
