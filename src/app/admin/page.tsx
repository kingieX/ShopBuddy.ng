'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function admin() {
  const router = useRouter();

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
          router.push('/admin/overview');
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
}
