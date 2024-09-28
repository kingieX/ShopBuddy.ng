'use client';
import { useState } from 'react';
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  User,
  LucideAArrowDown,
} from 'lucide-react'; // React Lucide icons
import { GoPerson } from 'react-icons/go';
import { LuShoppingBag } from 'react-icons/lu';
import { FaRegStar } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';
import { TfiHome } from 'react-icons/tfi';
import { MdOutlineLocalLibrary } from 'react-icons/md';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

import Image from 'next/image';
import Link from 'next/link';

const Navbar = ({
  isSignedIn,
  isAuthPage,
  profileImage,
}: {
  isSignedIn: boolean;
  isAuthPage: boolean;
  profileImage: string | undefined;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          {/* left */}
          <div className="flex flex-shrink-0 items-center">
            <Image
              src="/assets/favicon.svg"
              alt="Google"
              width={40}
              height={40}
              className="mr-2"
            />
            <h1 className="text-xl font-bold">ShopBuddy</h1>
          </div>

          {/* middle */}
          {/* Menu on large screens */}
          <div className="mr-12 hidden items-center space-x-4 md:flex">
            <Link
              href="/"
              className="font-medium text-gray-900 hover:underline"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="font-medium text-gray-900 hover:underline"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-900 hover:underline"
            >
              About
            </Link>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            {!isAuthPage && (
              <div className="ml-4 flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="hidden rounded-md border px-3 py-2 text-sm focus:outline-none sm:block"
                  />
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                </div>
                <Heart className="h-6 w-6 text-gray-500" />
                <ShoppingCart className="h-6 w-6 text-gray-500" />
              </div>
            )}

            {/* Sign Up / Profile */}
            {!isSignedIn && !isAuthPage && (
              <Link
                href="/auth/signup"
                className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            )}
            {isSignedIn && (
              <div className="relative">
                <GoPerson
                  className="h-8 w-8 cursor-pointer rounded-full border bg-button p-1 text-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                />
                {menuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-64 rounded-md bg-primary py-1 text-white shadow-lg">
                    <Link
                      href="/profile"
                      className="my-1 block px-4 py-2 text-sm hover:text-gray-300"
                    >
                      <GoPerson className="mr-2 inline-block h-6 w-6" />
                      Manage my account
                    </Link>
                    <Link
                      href="/orders"
                      className="my-1 block px-4 py-2 text-sm hover:text-gray-300"
                    >
                      <LuShoppingBag className="mr-2 inline-block h-6 w-6" />
                      My Orders
                    </Link>
                    <Link
                      href="/orders"
                      className="my-1 block px-4 py-2 text-sm hover:text-gray-300"
                    >
                      <FaRegStar className="mr-2 inline-block h-6 w-6" />
                      My Reviews
                    </Link>
                    <Link
                      href="/logout"
                      className="my-1 block px-4 py-2 text-sm hover:text-gray-300"
                    >
                      <CiLogout className="mr-2 inline-block h-6 w-6" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger menu on mobile */}
          <div className="flex items-center md:hidden">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute right-0 w-64 border bg-primary text-white md:hidden">
            <div className="flex flex-col items-start space-y-1 py-3">
              <div className="w-full border-b">
                <Link
                  href="/"
                  className="my-1 block px-4 py-2 text-base hover:text-blue-700"
                >
                  <TfiHome className="mr-2 inline-block h-6 w-6" />
                  Home
                </Link>
                <Link
                  href="/contact"
                  className="my-1 block px-4 py-2 text-base hover:text-blue-700"
                >
                  <MdOutlineLocalLibrary className="mr-2 inline-block h-6 w-6" />
                  Contact
                </Link>
                <Link
                  href="/about"
                  className="my-1 block px-4 py-2 text-base hover:text-blue-700"
                >
                  <AiOutlineQuestionCircle className="mr-2 inline-block h-6 w-6" />
                  About
                </Link>
              </div>
              {!isSignedIn && !isAuthPage && (
                <Link
                  href="/auth/signup"
                  className="my-1 block px-4 py-2 text-sm hover:text-blue-700"
                >
                  <CiLogout className="mr-2 inline-block h-6 w-6" />
                  Sign Up
                </Link>
              )}
              {isSignedIn && (
                <div className="mt-2 py-1 text-white">
                  <Link
                    href="/profile"
                    className="my-1 block px-4 py-2 text-sm hover:text-blue-700"
                  >
                    <GoPerson className="mr-2 inline-block h-6 w-6" />
                    Manage my account
                  </Link>
                  <Link
                    href="/orders"
                    className="my-1 block px-4 py-2 text-sm hover:text-blue-700"
                  >
                    <LuShoppingBag className="mr-2 inline-block h-6 w-6" />
                    My Orders
                  </Link>
                  <Link
                    href="/reviews"
                    className="my-1 block px-4 py-2 text-sm hover:text-blue-700"
                  >
                    <FaRegStar className="mr-2 inline-block h-6 w-6" />
                    My Reviews
                  </Link>
                  <Link
                    href="/logout"
                    className="my-1 block px-4 py-2 text-sm hover:text-blue-700"
                  >
                    <CiLogout className="mr-2 inline-block h-6 w-6" />
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
