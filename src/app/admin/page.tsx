'use client';
import { useRouter } from 'next/navigation';

export default function admin() {
  const router = useRouter();

  router.push('/adminAuth/auth/login');
}
