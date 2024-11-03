'use client';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { useSession } from 'next-auth/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import SideMenu from '../components/SideMenu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Icons for eye and loader
import toast from 'react-hot-toast';

// protected page import plue useEffect
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Orders = () => {
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

  //   if (!user) {
  //     return (
  //       <div className="flex min-h-screen items-center justify-center">
  //         <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  //       </div>
  //     );
  //   }

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
                  <BreadcrumbPage>My Orders</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="mt-2 lg:hidden">
            <SideMenu />
          </div>
        </div>

        <div className="mt-2 flex w-full lg:gap-8">
          {/* Side Menu */}
          <div className="hidden lg:block">
            <SideMenu />
          </div>

          {/* my orders */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
