'use client';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');

    if (!token) {
      router.push('/adminAuth/auth/login'); // Redirect to login if no token
      return;
    }

    const secret = process.env.JWT_SECRET as any;
    if (!secret) {
      console.log('Secret not found!!!');
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, secret); // Use the same secret as when signing
      // You can also check for approval status here if needed
    } catch (error) {
      // Token is invalid or expired
      sessionStorage.removeItem('admin_token'); // Clear invalid token
      router.push('/adminAuth/auth/login'); // Redirect to login
    }
  }, [router]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="fixed hidden h-screen w-0 border-r border-gray-300 bg-gray-100 lg:block lg:w-64">
        {/* Your Sidebar Code */}
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="static flex flex-1 flex-col lg:ml-64">
        {/* TopBar, without overlapping the sidebar */}
        <TopBar />

        {/* Content below the top bar */}
        <div className="h-screen flex-1 overflow-y-auto bg-gray-50 p-4 pt-14 lg:mt-4 lg:pt-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
