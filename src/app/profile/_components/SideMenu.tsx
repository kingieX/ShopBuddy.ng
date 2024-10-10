'use client';
import Link from 'next/link';
import { useState } from 'react';

const SideMenu = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(true);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(true);

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const toggleOrderMenu = () => {
    setIsOrderMenuOpen(!isOrderMenuOpen);
  };

  const [activeLink, setActiveLink] = useState('/profile');

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className="w-64 text-left">
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
        <h3 className="cursor-pointer font-semibold" onClick={toggleOrderMenu}>
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
              activeLink === '/reviews' ? 'text-button' : 'hover:text-gray-500'
            }`}
            onClick={() => handleLinkClick('/reviews')}
          >
            My Reviews
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
