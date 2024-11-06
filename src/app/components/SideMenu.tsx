'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PanelRightOpen, X } from 'lucide-react'; // Icons for hamburger and close buttons
import { usePathname } from 'next/navigation';

const SideMenu = () => {
  const pathname = usePathname();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(true);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle on mobile
  const [activeLink, setActiveLink] = useState('');

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggles the menu visibility on mobile
  };

  return (
    <div>
      {/* Hamburger Icon for Mobile View */}
      <button
        onClick={toggleMenu}
        className="text-gray-600 focus:outline-none md:hidden" // Hide button on medium screens and up
      >
        {isMenuOpen ? <X size={24} /> : <PanelRightOpen size={24} />}{' '}
        {/* Show close icon if menu is open */}
      </button>

      {/* Side Menu - Conditionally rendered based on screen size */}
      <div
        className={`${
          isMenuOpen
            ? 'mt-16 block border pl-8 lg:mt-0 lg:border-none lg:pl-0'
            : 'hidden'
        } fixed left-0 top-0 z-10 h-full w-64 bg-white p-4 text-left shadow-lg md:static md:block md:shadow-none`}
      >
        {/* Hamburger Icon for Mobile View */}
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="mb-4 text-gray-600 focus:outline-none md:hidden" // Hide button on medium screens and up
          >
            {isMenuOpen ? <X size={24} /> : <PanelRightOpen size={24} />}{' '}
            {/* Show close icon if menu is open */}
          </button>
        </div>

        {/* Manage My Account */}
        <div>
          <h3
            className="cursor-pointer font-semibold"
            onClick={toggleAccountMenu}
          >
            Manage My Account
          </h3>
          {isAccountMenuOpen && (
            <div className="pl-4">
              <Link href="/profile">
                <span
                  className={`block ${pathname === '/profile' ? 'text-button' : 'hover:text-gray-500'}`}
                >
                  Profile
                </span>
              </Link>
              <Link href="/address-book">
                <span
                  className={`block ${pathname === '/address-book' ? 'text-button' : 'hover:text-gray-500'}`}
                >
                  Address Book
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* My Orders */}
        <div className="mt-6">
          <Link href="/orders">
            <span
              className={`block font-semibold ${pathname?.startsWith('/orders') ? 'text-button' : 'hover:text-gray-500'}`}
            >
              My Orders
            </span>
          </Link>
        </div>

        {/* My Reviews */}
        <div className="mt-6">
          <Link href="/reviews">
            <span
              className={`block font-semibold ${pathname === '/reviews' ? 'text-button' : 'hover:text-gray-500'}`}
            >
              My Reviews
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
