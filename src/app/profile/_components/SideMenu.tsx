'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PanelRightOpen, X } from 'lucide-react'; // Icons for hamburger and close buttons

const SideMenu = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(true);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle on mobile
  const [activeLink, setActiveLink] = useState('/profile');

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const toggleOrderMenu = () => {
    setIsOrderMenuOpen(!isOrderMenuOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggles the menu visibility on mobile
  };

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setIsMenuOpen(false); // Close the menu when a link is clicked on mobile
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
                  className={`block ${
                    activeLink === '/profile'
                      ? 'text-button'
                      : 'hover:text-gray-500'
                  }`}
                  onClick={() => handleLinkClick('/profile')}
                >
                  Profile
                </span>
              </Link>
              <Link href="/address">
                <span
                  className={`block ${
                    activeLink === '/address'
                      ? 'text-button'
                      : 'hover:text-gray-500'
                  }`}
                  onClick={() => handleLinkClick('/address')}
                >
                  Address Book
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* My Orders */}
        <div className="mt-6">
          <h3
            className="cursor-pointer font-semibold"
            onClick={toggleOrderMenu}
          >
            My Orders
          </h3>
          {isOrderMenuOpen && (
            <div className="pl-4">
              <Link href="/delivered">
                <span
                  className={`block ${
                    activeLink === '/delivered'
                      ? 'text-button'
                      : 'hover:text-gray-500'
                  }`}
                  onClick={() => handleLinkClick('/delivered')}
                >
                  Delivered
                </span>
              </Link>
              <Link href="/processing">
                <span
                  className={`block ${
                    activeLink === '/processing'
                      ? 'text-button'
                      : 'hover:text-gray-500'
                  }`}
                  onClick={() => handleLinkClick('/processing')}
                >
                  Processing
                </span>
              </Link>
              <Link href="/cancelled">
                <span
                  className={`block ${
                    activeLink === '/cancelled'
                      ? 'text-button'
                      : 'hover:text-gray-500'
                  }`}
                  onClick={() => handleLinkClick('/cancelled')}
                >
                  Cancelled
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* My Reviews */}
        <div className="mt-6">
          <Link href="/reviews">
            <span
              className={`block font-semibold ${
                activeLink === '/reviews'
                  ? 'text-button'
                  : 'hover:text-gray-500'
              }`}
              onClick={() => handleLinkClick('/reviews')}
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
