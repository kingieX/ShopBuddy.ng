'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SlWallet } from 'react-icons/sl';
import { RiAdvertisementLine } from 'react-icons/ri';
import { GiShoppingCart } from 'react-icons/gi';
import { BsCartPlus } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { CgList } from 'react-icons/cg';
import { Component, CircleGauge } from 'lucide-react';

import Logo from '../../assets/logo.png';
import Image from 'next/image';

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const pathname = usePathname() || '';

  const menuItems = [
    {
      name: 'Overview',
      href: '/admin/overview',
      icon: <CircleGauge size={20} />,
    },
    {
      name: 'Billboards',
      href: '/admin/billboards',
      icon: <RiAdvertisementLine size={20} />,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: <GiShoppingCart size={24} />,
    },
    {
      name: 'Add Product',
      href: '/admin/add-product',
      icon: <BsCartPlus size={22} />,
    },
    {
      name: 'Category',
      href: '/admin/categories',
      icon: <Component size={20} />,
    },
    { name: 'Orders', href: '/admin/orders', icon: <CgList size={22} /> },
    { name: 'Payments', href: '/admin/payments', icon: <SlWallet size={20} /> },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: <MdPeopleOutline size={24} />,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <MdOutlineSettingsSuggest size={24} />,
    },
  ];

  return (
    <div className="z-50 h-screen border-r border-gray-300 bg-white lg:w-64">
      <div className="hidden w-full items-center justify-center px-4 py-4 lg:flex lg:justify-start">
        <Image
          src={Logo}
          alt="Logo"
          width={1500}
          height={1500}
          className="w-64"
        />
      </div>
      <ul className="mt-4 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`flex items-center gap-2 rounded-md px-6 py-2 text-gray-700 transition-all hover:bg-gray-200 ${
                pathname.startsWith(item.href) // Check if the pathname starts with the item href
                  ? 'bg-gray-200 font-semibold text-[#1600A0]'
                  : ''
              }`}
              onClick={closeSidebar} // Close sidebar on menu click
            >
              <span
                className={`${pathname.startsWith(item.href) ? 'text-[#1600A0]' : ''}`}
              >
                {item.icon}
              </span>
              <span
                className={`${pathname.startsWith(item.href) ? 'text-[#1600A0]' : ''}`}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
