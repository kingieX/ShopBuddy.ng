'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../assets/favicon.svg';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        // Store the JWT token in session storage
        sessionStorage.setItem('admin_token', response.data.token);
        // If admin is approved, redirect to admin dashboard
        router.push('/admin/overview');
      } else {
        // If admin is not approved, show error
        setError('Your account is pending approval by the owner.');
      }
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

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
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mb-4 w-full border p-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mb-4 w-full border p-2"
            />
            <button
              type="submit"
              className="bg-button px-8 py-2 text-white hover:bg-blue-500"
            >
              Login
            </button>
          </form>

          <p className="py-4 text-center text-sm">
            create a new account if you are asigned as an admin
            <Link
              className="ml-2 text-button hover:underline"
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
