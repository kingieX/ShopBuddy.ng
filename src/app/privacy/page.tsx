'use client';
import Head from 'next/head';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Adding fade-in animation to sections on page load
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      (section as HTMLElement).style.animation =
        `fadeInUp 1s ease-out ${index * 0.3}s forwards`;
    });
  }, []);

  return (
    <>
      <Navbar isAuthPage={false} />
      <Head>
        <title>Privacy Policy | ShopBuddy</title>
        <meta
          name="description"
          content="Privacy Policy for ShopBuddy E-commerce site. Learn how we collect, use, and protect your data."
        />
      </Head>

      <div className="mx-auto bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-8 py-24 lg:px-20">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 transition duration-300 hover:text-button">
            Privacy Policy
          </h1>
        </header>

        <section className="section mt-12 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Introduction
          </h2>
          <p className="mt-2 text-gray-600">
            Welcome to{' '}
            <span className="font-semibold text-button">ShopBuddy</span>. Your
            privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information when you visit
            our website or make a purchase.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Information We Collect
          </h2>
          <p className="mt-2 text-gray-600">
            We collect the following types of personal information:
          </p>
          <ul className="ml-8 mt-2 list-disc text-gray-600">
            <li>
              Personal Identification Information (name, email address, phone
              number, shipping address)
            </li>
            <li>Payment Information (billing address)</li>
            <li>Website Usage Data (cookies, IP address, browsing behavior)</li>
          </ul>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            How We Use Your Information
          </h2>
          <p className="mt-2 text-gray-600">
            We use the collected information for the following purposes:
          </p>
          <ul className="ml-8 mt-2 list-disc text-gray-600">
            <li>To process transactions and deliver purchased products</li>
            <li>To personalize your shopping experience</li>
            <li>To improve our website and customer service</li>
            <li>
              To send periodic emails (order updates, promotional offers, etc.)
            </li>
          </ul>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Data Protection
          </h2>
          <p className="mt-2 text-gray-600">
            We implement a variety of security measures to maintain the safety
            of your personal information when you place an order or enter,
            submit, or access your personal information.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Cookies
          </h2>
          <p className="mt-2 text-gray-600">
            Our website uses cookies to enhance your user experience, track site
            usage, and serve personalized advertisements. You can control cookie
            settings through your browser.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Your Rights
          </h2>
          <p className="mt-2 text-gray-600">
            You have the right to access, correct, delete, or restrict the use
            of your personal data. For any requests related to your personal
            data, please contact us at support@shopbuddy.ng.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Changes to This Privacy Policy
          </h2>
          <p className="mt-2 text-gray-600">
            We reserve the right to update this Privacy Policy. Any changes will
            be posted on this page, and the effective date will be updated.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Contact Us
          </h2>
          <p className="mt-2 text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us at: support@shopbuddy.ng.
          </p>
        </section>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicy;
