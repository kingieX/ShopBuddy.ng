'use client';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { useSession } from 'next-auth/react';
import SideMenu from './_components/SideMenu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Icons for eye and loader
import toast from 'react-hot-toast';

// protected page import plue useEffect
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Define the User type
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
}

// Define the FormData type
interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  location: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //   use for protected pages
  const router = useRouter();

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
      }
    };

    securePage();
  }, [router]);

  // Use the User type for user state
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Use the FormData type for formData state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/user', {
        method: 'GET',
      });
      const data = await res.json();
      setUser(data.user);
      setFormData({
        firstName: data.user.firstName || '',
        lastName: data.user.lastName || '',
        phoneNumber: data.user.phoneNumber || '',
        location: data.user.location || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }

    fetchUser();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Reset error

    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setLoading(false); // End loading

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser.user);
      setIsEditing(false);

      setShowPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      toast.success('successfully updated profile', {
        duration: 4000, // Toast shows for 4 seconds
      });
    } else {
      console.error('Error updating user');
      const errorData = await res.json();
      setError(errorData.error || 'Error updating user');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="flex min-h-screen w-full flex-col px-8 py-20 lg:px-14">
        <div className="flex w-full items-center justify-between py-4 lg:py-8">
          <header className="stick z-5 bg-background top-0 hidden h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:flex">
            <Breadcrumb className="flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>My Account</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Profile Content */}
          <div className="lg:px-12">
            <h2 className="font-semibold">
              Welcome!{' '}
              <span className="text-button">
                {user.firstName} {user.lastName}
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-2 flex w-full gap-8">
          {/* Side Menu */}
          <div className="mt-4 hidden lg:block">
            <SideMenu />
          </div>

          {/* User Form */}
          <div className="mt-4 w-full rounded bg-white lg:mx-12 lg:border lg:px-6 lg:py-6 lg:shadow-md">
            {!isEditing ? (
              <div className="px-4 lg:px-8 lg:py-4">
                <h2 className="mb-4 text-2xl font-semibold text-button">
                  Your Profile
                </h2>
                {/* First Name & Last Name */}
                <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 lg:flex-row lg:space-x-4">
                  <div className="w-full">
                    <label>First Name:</label>
                    <Input name="firstName" value={user.firstName} disabled />
                  </div>
                  <div className="w-full">
                    <label>Last Name:</label>
                    <Input name="lastName" value={user.lastName} disabled />
                  </div>
                </div>
                {/* Email & Phone */}
                <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 lg:flex-row lg:space-x-4">
                  <div className="w-full">
                    <label>Email:</label>
                    <Input name="email" value={user.email} disabled />
                  </div>
                  <div className="w-full">
                    <label>Phone Number:</label>
                    <Input
                      name="phoneNumber"
                      value={user.phoneNumber || 'N/A'}
                      disabled
                    />
                  </div>
                </div>
                {/* Location */}
                <div className="mb-4 flex w-full items-center justify-between space-x-8">
                  <div className="w-full">
                    <label>Location:</label>
                    <Input
                      name="location"
                      value={user.location || 'N/A'}
                      disabled
                    />
                  </div>
                </div>
                {/* Edit Button */}
                <div className="flex w-full justify-end">
                  <Button
                    className="bg-button px-4 text-white hover:bg-blue-700"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            ) : (
              <div className="px-4 lg:px-8 lg:py-4">
                <h2 className="mb-4 text-2xl font-semibold text-button">
                  Edit Your Profile
                </h2>
                {/* First Name & Last Name */}
                <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 lg:flex-row lg:space-x-4">
                  <div className="w-full">
                    <label>First Name</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <label>Last Name</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Email & Phone */}
                <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 lg:flex-row lg:space-x-4">
                  <div className="w-full">
                    <label>
                      Email<span className="text-error">*</span>
                    </label>
                    <Input name="email" value={user.email} disabled />
                  </div>
                  <div className="w-full">
                    <label>Phone Number</label>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Location */}
                <div className="mb-4 flex w-full items-center justify-between space-x-8">
                  <div className="w-full">
                    <label>Location</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Password change */}
                <div className="mb-4 flex w-full items-center justify-between space-x-8">
                  <div className="w-full">
                    <label>Password Changes</label>
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          placeholder="Current Password"
                        />
                        {/* Eye Icon */}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-[8px] cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="New Password"
                        />
                        {/* Eye Icon */}
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-[8px] cursor-pointer"
                        >
                          {showNewPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm New Password"
                        />
                        {/* Eye Icon */}
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-[8px] cursor-pointer"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Save Changes & Cancel Button */}
                <div className="flex w-full justify-end pt-4">
                  <Button
                    className="border border-error bg-transparent px-4 text-error hover:bg-error hover:text-white"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="ml-4 bg-button px-4 text-white hover:bg-blue-700"
                    onClick={handleSaveChanges}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
                {/* Error Display */}
                {error && <p className="text-red-500">{error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
