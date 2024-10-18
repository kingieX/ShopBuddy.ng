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

const Settings = () => {
  // State to control the modal visibility
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission
    // Add logic to handle password change
    if (newPassword === confirmPassword) {
      console.log('Password changed successfully.');
    } else {
      console.log('Passwords do not match.');
    }
    setOpen(false);
  };

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
                  <Input placeholder="Email Address" type="email" />
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
              <CardFooter className="border-t px-6 py-4">
                <Button className="bg-button text-white hover:bg-blue-600">
                  Save
                </Button>
              </CardFooter>
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
            <Card>
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
            </Card>

            {/* Logout */}
            <Card>
              <CardFooter className="px-6 py-4">
                <Button className="w-full bg-red-600 text-white hover:bg-red-400">
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
                <form
                  onSubmit={handleChangePassword}
                  className="flex flex-col gap-4"
                >
                  <Input
                    placeholder="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Save Changes
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
