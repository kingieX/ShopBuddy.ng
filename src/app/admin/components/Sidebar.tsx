'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaTags, FaShoppingCart, FaUsers, FaCogs, FaClipboardList, FaThLarge } from 'react-icons/fa';
import { TfiHome } from "react-icons/tfi";
import { RiAdvertisementLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { GiShoppingCart } from "react-icons/gi";

import Logo from '../../assets/favicon.svg'
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/admin/overview", icon: <TfiHome /> },
    { name: "Billboards", href: "/admin/billboards", icon: <RiAdvertisementLine /> },
    { name: "Categories", href: "/admin/categories", icon: <BiCategoryAlt /> },
    { name: "Products", href: "/admin/products", icon: <GiShoppingCart /> },
    { name: "Add Product", href: "/admin/add-product", icon: <FaClipboardList /> },
    { name: "Orders", href: "/admin/orders", icon: <FaClipboardList /> },
    { name: "Customers", href: "/admin/customers", icon: <FaUsers /> },
    { name: "Settings", href: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <div className="lg:w-64 h-screen bg-white border-r border-gray-300">
      <div className="hidden lg:flex  items-center justify-start space-x-1 py-4 px-4">
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <h1 className="text-2xl font-bold">ShopBuddy</h1>
      </div>
      <ul className="mt-4 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href} 
              className={`flex items-center gap-2 py-2 px-6 text-gray-700 hover:bg-gray-200 rounded-md transition-all ${
                pathname === item.href ? "bg-gray-200 font-semibold text-[#1600A0]" : ""
              }`}
            >
              <span className={`${pathname === item.href ? 'text-[#1600A0]' : ''}`}>
                {item.icon}
              </span>
              <span className={`${pathname === item.href ? 'text-[#1600A0]' : ''}`}>
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
