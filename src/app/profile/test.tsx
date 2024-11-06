'use client';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { useSession, getSession } from 'next-auth/react';
import SideMenu from '../components/SideMenu';
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
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
}

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
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
      }
    };

    securePage();
  }, [router]);

  useEffect(() => {
    async function fetchUser() {
      if (session) {
        const res = await fetch('/api/user', { method: 'GET' });
        const data = await res.json();

        if (data.user) {
          setUser(data.user);
          setFormData((prevFormData) => ({
            ...prevFormData,
            firstName: data.user.firstName || '',
            lastName: data.user.lastName || '',
            phoneNumber: data.user.phoneNumber || '',
            location: data.user.location || '',
          }));
        }
      }
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

    setLoading(true);
    setError(null);

    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser.user);
      setIsEditing(false);

      setShowPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      toast.success('Successfully updated profile', { duration: 4000 });
    } else {
      const errorData = await res.json();
      setError(errorData.error || 'Error updating user');
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="flex min-h-screen w-full flex-col px-8 py-20 lg:px-14">
        <header className="bg-background sticky top-0 hidden h-14 items-center gap-4 border-b px-4 lg:flex">
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

        <div className="mt-2 lg:hidden">
          <SideMenu />
        </div>

        <div className="lg:px-12">
          <h2 className="font-semibold">
            Welcome,{' '}
            <span className="text-button">
              {user.firstName} {user.lastName}
            </span>
          </h2>
        </div>

        <div className="mt-2 flex w-full lg:gap-8">
          <div className="hidden lg:block">
            <SideMenu />
          </div>

          <div className="mt-3 w-full rounded bg-white lg:mx-12 lg:border lg:px-6 lg:py-6 lg:shadow-md">
            {!isEditing ? (
              <div className="px-4 lg:px-8 lg:py-4">
                <h2 className="mb-4 text-2xl font-semibold text-button">
                  Your Profile
                </h2>
                {/* Profile Details */}
                <div className="mb-4 flex w-full flex-col gap-4 lg:flex-row">
                  <div className="w-full">
                    <label>First Name:</label>
                    <Input name="firstName" value={user.firstName} disabled />
                  </div>
                  <div className="w-full">
                    <label>Last Name:</label>
                    <Input name="lastName" value={user.lastName} disabled />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-button text-white hover:bg-blue-700"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSaveChanges}
                className="px-4 lg:px-8 lg:py-4"
              >
                <h2 className="mb-4 text-2xl font-semibold text-button">
                  Edit Your Profile
                </h2>
                <div className="mb-4 flex w-full flex-col gap-4 lg:flex-row">
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
                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border border-error text-error"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="ml-4 bg-button text-white hover:bg-blue-700"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
