'use client';
import axios from 'axios';
import Image from 'next/image';
import Logo from '../../../assets/logo.png';
import { useEffect, useState } from 'react';

export default function RejectAdmin() {
  const [adminId, setAdminId] = useState<string | null>(null); // Initialize as null
  const [message, setMessage] = useState('');

  // Get adminId from the URL query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const adminId = queryParams.get('adminId'); // Safely fetch the adminId
    if (adminId) {
      setAdminId(adminId); // Set adminId when available
    }
    console.log('adminId:', adminId);
  }, []);

  // Send reject request when adminId is available
  useEffect(() => {
    if (adminId) {
      axios
        .get(`/api/admin/auth/reject?adminId=${adminId}`) // Using GET here
        .then(() => setMessage('Admin rejected successfully!'))
        .catch(() => setMessage('Error rejecting admin.'));
    }
  }, [adminId]); // Only execute when adminId is set

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
      <div className="rounded bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold">{message || 'Processing...'}</h2>
      </div>
    </div>
  );
}
