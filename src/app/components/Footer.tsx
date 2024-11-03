// components/Footer.tsx
import { Input } from '@/components/ui/input'; // Optional, if you want to use Shadcn components
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoSendSharp } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-black py-10 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-4">
        {/* Left Section - ShopBuddy */}
        <div>
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/logo.png"
              alt="Google"
              width={1500}
              height={1500}
              className="mr-2 w-1/2 lg:w-full"
            />
            {/* <h3 className="text-lg font-semibold">ShopBuddy</h3> */}
          </div>
          <p className="mb-4 font-semibold lg:mt-4">Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className="space-x- mt-4 flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-md px-4 py-2 text-black"
            />
            <Button className="rounded-r-md border bg-black px-2 py-2 text-black">
              <IoSendSharp className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Middle Section - Support */}
        <div className="lg:mt-12">
          <h3 className="text-lg font-semibold">Support</h3>
          <p className="mt-4">11, Abakaliki Ebonyi State, Nigeria</p>
          <p>shopbuddy@gmail.com</p>
          <p>+234-88888-9999</p>
        </div>

        {/* Middle Section - Account Links */}
        <div className="lg:mt-12">
          <h3 className="text-lg font-semibold">Account</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                My Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Login / Register
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cart
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Wishlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
          </ul>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="lg:mt-12">
          <h3 className="text-lg font-semibold">Quick Link</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms Of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between space-y-6 px-4 lg:flex-row lg:space-y-0 lg:px-16">
        {/* Download App Section */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Image
            src="/google-play.png"
            alt="Google Play"
            width={150}
            height={50}
            className="hidden"
          />
          <Image
            src="/app-store.png"
            alt="App Store"
            width={150}
            height={50}
            className="hidden"
          />
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <FaFacebook className="h-6 w-6" />
          <FaTwitter className="h-6 w-6" />
          <FaInstagram className="h-6 w-6" />
          <FaLinkedin className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-4 text-center text-gray-500">
        © Copyright ShopBuddy 2024. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
