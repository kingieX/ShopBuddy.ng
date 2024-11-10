'use client';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('admin_token');

      if (!token) {
        // No token found, redirect to login page
        router.push('/adminAuth/auth/login');
        return;
      }

      try {
        // Send token to server to verify its validity
        const response = await axios.post('/api/admin/auth/verify-token', {
          token,
        });

        if (response.status === 200) {
          // Token is valid, allow access to the page
          setLoading(false);
        } else {
          // Invalid token, remove it and redirect to login
          localStorage.removeItem('admin_token');
          router.push('/adminAuth/auth/login');
        }
      } catch (error) {
        // Handle the error (e.g. invalid/expired token)
        localStorage.removeItem('admin_token');
        router.push('/adminAuth/auth/login');
      }
    };

    checkToken();
  }, [router]);

  // Close Sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader/spinner if you like
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="fixed hidden h-screen w-0 border-r border-gray-300 bg-gray-100 lg:block lg:w-64">
        <Sidebar closeSidebar={closeSidebar} />
      </aside>

      {/* Main Content Area */}
      <div className="static flex flex-1 flex-col lg:ml-64">
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
