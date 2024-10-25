'use client';

import { useSession, signOut } from 'next-auth/react'; // Import the useSession and signOut hooks
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Use router for navigation
import { Menu, X, Search, ShoppingCart, Heart } from 'lucide-react'; // React Lucide icons
import { GoPerson } from 'react-icons/go';
import { LuShoppingBag } from 'react-icons/lu';
import { FaRegStar } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';
import { TfiHome } from 'react-icons/tfi';
import { MdOutlineLocalLibrary } from 'react-icons/md';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import SideCart from './SideCart';

const Navbar = ({ isAuthPage }: { isAuthPage: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null); // Track active link
  const { data: session, status } = useSession(); // Use session and status from NextAuth
  const isSignedIn = status === 'authenticated'; // Determine if the user is signed in
  const menuRef = useRef<HTMLDivElement>(null); // Reference for the menu div
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // State for dialog visibility
  const { wishlist } = useWishlist();
  const [showSideCart, setShowSideCart] = useState(false);
  // const cartItems = 10;

  const { countAllItems } = useCart();
  const totalItems = countAllItems();

  console.log('total items: ', totalItems);

  const router = useRouter();

  // Handle logout logic
  const handleLogout = () => {
    signOut();
    setActiveLink('');
    setShowLogoutDialog(false); // Close dialog after logout
  };

  // Handle link click to set active state and navigate
  const handleLinkClick = (path: string) => {
    setActiveLink(path); // Update the active link state first
    setMenuOpen(false); // Close the menu after click
    // router.push(path); // Navigate programmatically
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the clicked target is a link or inside the menu
      const target = event.target as HTMLElement;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest('.ignore-menu-close')
      ) {
        setMenuOpen(false); // Close the menu if the click is outside the menu and not on a link
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="fixed z-20 w-full border-b bg-white shadow-md">
      <div className="lg:px- mx-auto max-w-7xl px-4 sm:px-8">
        <div className="relative flex h-16 justify-between">
          {/* left */}
          <div className="flex flex-shrink-0 items-center">
            <Image
              src="/assets/logo.png"
              alt="Favicon"
              width={1500}
              height={1500}
              className="w-24"
            />
            {/* <h1 className="text-xl font-bold text-button">ShopBuddy</h1> */}
          </div>

          {/* middle */}
          <div className="mx-12 hidden items-center space-x-4 pl-28 md:flex">
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
                {/* Wishlist icon logic */}
                <Link href="/wishlist">
                  <div className="relative">
                    <Heart className="h-6 w-6 text-gray-500" />
                    {/* {wishlistCount > 0 && ( */}
                    <span className="">
                      {wishlist.length === 1 ? (
                        <span className="absolute -right-2 -top-2 rounded-full bg-red-600 px-1 text-xs text-white">
                          {wishlist.length}
                        </span>
                      ) : (
                        ''
                      )}
                    </span>
                    {/* )} */}
                  </div>
                </Link>
                {/* // Cart icon */}
                <button
                  onClick={() => setShowSideCart((old) => !old)}
                  className="relative rounded-full bg-gray-200 p-2"
                >
                  <ShoppingCart className="h-6 w-6 text-gray-500" />
                  {/* {cartItems > 0 ? (
                    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-button bg-opacity-70 text-xs font-semibold text-white">
                      <p>{cartItems >= 9 ? '9+' : cartItems}</p>
                    </div>
                  ) : null} */}
                  {totalItems > 0 && (
                    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-button bg-opacity-70 text-xs font-semibold text-white">
                      <span>{totalItems}</span>
                    </div>
                  )}
                </button>

                {/* <Link href="/checkout" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-500" />
                </Link> */}
              </div>
            )}

            {/* Sign Up / Profile */}
            {!isSignedIn && !isAuthPage && (
              <Link
                href="/auth/signin"
                className="ml-4 rounded-md bg-button px-4 py-2 text-white hover:bg-blue-600"
              >
                Sign In
              </Link>
            )}

            {isSignedIn && session && (
              <div className="relative" ref={menuRef}>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-button text-button ${
                    activeLink
                      ? 'bg-button text-white'
                      : 'hover:bg-button hover:text-white'
                  }`}
                >
                  <GoPerson
                    className="h-8 w-8 cursor-pointer p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                  />
                </div>
                {menuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-64 rounded-md bg-primary py-1 text-white shadow-lg">
                    <Link
                      href="/profile"
                      className={`my-1 block w-full px-4 py-2 text-left text-sm hover:text-gray-300 ${
                        activeLink === '/profile' ? 'text-gray-300' : ''
                      }`}
                      onClick={() => handleLinkClick('/profile')}
                    >
                      <GoPerson className="mr-2 inline-block h-6 w-6" />
                      Manage my account
                    </Link>
                    <Link
                      href="/orders"
                      className={`my-1 block w-full px-4 py-2 text-left text-sm hover:text-gray-300 ${
                        activeLink === '/orders' ? 'text-gray-300' : ''
                      }`}
                      onClick={() => handleLinkClick('/orders')}
                    >
                      <LuShoppingBag className="mr-2 inline-block h-6 w-6" />
                      My Orders
                    </Link>
                    <Link
                      href="/reviews"
                      className={`my-1 block w-full px-4 py-2 text-left text-sm hover:text-gray-300 ${
                        activeLink === '/reviews' ? 'text-gray-300' : ''
                      }`}
                      onClick={() => handleLinkClick('/reviews')}
                    >
                      <FaRegStar className="mr-2 inline-block h-6 w-6" />
                      My Reviews
                    </Link>
                    <button
                      className="my-1 block w-full px-4 py-2 text-left text-sm hover:text-gray-300"
                      // onClick={() => {
                      //   signOut();
                      //   setActiveLink(''); // Reset active link after logout
                      // }}
                      onClick={() => {
                        setShowLogoutDialog(true);
                        setActiveLink('');
                      }} // Open dialog on click
                    >
                      <CiLogout className="mr-2 inline-block h-6 w-6" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger menu on mobile */}
          <div className="flex items-center md:hidden">
            <div className="mr-4 flex items-center space-x-4">
              {/* Wishlist icon logic */}
              <Link href="/wishlist">
                <div className="relative">
                  <Heart className="h-6 w-6 text-gray-500" />
                  <span className="">
                    {wishlist.length === 1 ? (
                      <span className="absolute -right-2 -top-2 rounded-full bg-red-600 px-1 text-xs text-white">
                        {wishlist.length}
                      </span>
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </Link>
              {/* // Cart icon */}
              {/* <ShoppingCart className="h-6 w-6 text-gray-500" /> */}
              <button
                onClick={() => setShowSideCart((old) => !old)}
                className="relative rounded-full bg-gray-200 p-2"
              >
                <ShoppingCart className="h-6 w-6 text-gray-500" />
                {/* {cartItems > 0 ? (
                  <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-button bg-opacity-70 text-xs font-semibold text-white">
                    <p>{cartItems >= 9 ? '9+' : cartItems}</p>
                  </div>
                ) : null} */}
                {totalItems > 0 && (
                  <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-button bg-opacity-70 text-xs font-semibold text-white">
                    <span>{totalItems}</span>
                  </div>
                )}
              </button>
            </div>
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
            <div className="flex w-full flex-col items-start space-y-1 py-3">
              <div className="w-full border-b">
                <Link
                  href="/"
                  className="ignore-menu-close my-1 block px-4 py-2 text-base hover:text-blue-700"
                >
                  <TfiHome className="mr-2 inline-block h-6 w-6" />
                  Home
                </Link>
                <Link
                  href="/contact"
                  className="ignore-menu-close my-1 block px-4 py-2 text-base hover:text-blue-700"
                >
                  <MdOutlineLocalLibrary className="mr-2 inline-block h-6 w-6" />
                  Contact
                </Link>
                <Link
                  href="/about"
                  className="ignore-menu-close my-1 block px-4 py-2 text-base hover:text-blue-700"
                >
                  <AiOutlineQuestionCircle className="mr-2 inline-block h-6 w-6" />
                  About
                </Link>

                <div className="relative mb-4 px-2">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="bg-red-700rounded-md border px-3 py-2 text-sm text-white focus:outline-none sm:block"
                  />
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                </div>
              </div>

              {!isSignedIn && !isAuthPage && (
                <div className="w-full border-b">
                  <Link
                    href="/auth/signin"
                    className="ignore-menu-close my-1 block px-4 py-2 text-sm hover:text-blue-700"
                  >
                    <CiLogout className="mr-2 inline-block h-6 w-6" />
                    Sign In
                  </Link>
                </div>
              )}

              {isSignedIn && session && (
                <div className="w-full border-b">
                  <Link
                    href="/profile"
                    className="ignore-menu-close my-1 block px-4 py-2 text-sm hover:text-blue-700"
                  >
                    <GoPerson className="mr-2 inline-block h-6 w-6" />
                    Manage my account
                  </Link>
                  <Link
                    href="/orders"
                    className="ignore-menu-close my-1 block px-4 py-2 text-sm hover:text-blue-700"
                  >
                    <LuShoppingBag className="mr-2 inline-block h-6 w-6" />
                    My Orders
                  </Link>
                  <Link
                    href="/reviews"
                    className="ignore-menu-close my-1 block px-4 py-2 text-sm hover:text-blue-700"
                  >
                    <FaRegStar className="mr-2 inline-block h-6 w-6" />
                    My Reviews
                  </Link>
                  <button
                    className="ignore-menu-close my-1 block w-full px-4 py-2 text-left text-sm hover:text-blue-700"
                    // onClick={() => signOut()} // Call signOut function on logout
                    onClick={() => setShowLogoutDialog(true)} // Open dialog on click
                  >
                    <CiLogout className="mr-2 inline-block h-6 w-6" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logout Dialog */}
      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to log out?</p>
          <DialogFooter className="flex flex-col gap-4 lg:flex-row">
            {/* <DialogClose asChild> */}
            <Button
              className="border border-gray-300 bg-transparent px-4 text-gray-400 hover:bg-gray-400/50 hover:text-white"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            {/* </DialogClose> */}
            <Button
              className="bg-error px-4 text-white hover:border hover:border-error hover:bg-transparent hover:text-error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SideCart */}
      <SideCart
        visible={showSideCart}
        onRequestClose={() => setShowSideCart(false)}
      />
    </nav>
  );
};

export default Navbar;
