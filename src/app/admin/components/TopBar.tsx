'use client';
import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar component exists
import Image from 'next/image';
import Logo from '../../assets/favicon.svg'


const TopBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white shadow-md h-16 z-10 flex items-center justify-between lg:px-6 lg:fixed top-0 lg:left-64 lg:right-0">
        <div className="flex items-center space-x-4">
          {/* Search bar visible on larger screens */}
          <div className="relative hidden lg:block">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          
          {/* Hamburger Menu for mobile view */}
          <div className='lg:hidden flex justify-center items-center space-x-2'>
            <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
            <div className='flex justify-center items-center space-x-1'>
              <Image src={Logo} alt="Logo" width={32} height={32} />
              <h1 className="text-xl font-bold">ShopBuddy</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mr-8">
          {/* Right Side Icons (e.g., Notifications, User profile) */}
          <IoMdNotificationsOutline className="text-gray-600" />
          <FaUser className="text-gray-600" />
        </div>
      </div>

      {/* Sidebar */}
      <div className={`lg:hidden fixed top-0 left-0 z-20 w-64 h-full bg-white border-r shadow-lg transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className='flex justify-center items-center space-x-1'>
            <Image src={Logo} alt="Logo" width={32} height={32} />
            <h1 className="text-xl font-bold">ShopBuddy</h1>
          </div>
          <FaTimes className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>
        {/* Render Sidebar component */}
        <Sidebar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black opacity-50 z-10" onClick={toggleSidebar}></div>}
    </>
  );
};

export default TopBar;
