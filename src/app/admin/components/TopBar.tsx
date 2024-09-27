'use client';
import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar component exists
import Image from 'next/image';
import Logo from '../../assets/favicon.svg';
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';

const TopBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="fixed z-10 flex h-16 w-full max-w-6xl items-center justify-between bg-white shadow-md lg:px-6">
        <div className="flex items-center space-x-4">
          {/* Search bar visible on larger screens */}
          <div className="relative hidden">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none"
            />
          </div>

          {/* Hamburger Menu for mobile view */}
          <div className="flex items-center justify-center space-x-2 lg:hidden">
            <FaBars
              className="cursor-pointer text-2xl"
              onClick={toggleSidebar}
            />
            <div className="flex items-center justify-center space-x-1">
              <Image src={Logo} alt="Logo" width={32} height={32} />
              <h1 className="text-xl font-bold">ShopBuddy</h1>
            </div>
          </div>
        </div>

        <div className="mr-8 flex items-center space-x-4">
          {/* Right Side Icons (e.g., Notifications, User profile) */}
          <IoMdNotificationsOutline className="text-gray-600" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/admin/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-20 h-full w-64 transform border-r bg-white shadow-lg transition-transform lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center justify-center space-x-1">
            <Image src={Logo} alt="Logo" width={32} height={32} />
            <h1 className="text-xl font-bold">ShopBuddy</h1>
          </div>
          <FaTimes
            className="cursor-pointer text-2xl"
            onClick={toggleSidebar}
          />
        </div>
        {/* Render Sidebar component */}
        <Sidebar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default TopBar;
