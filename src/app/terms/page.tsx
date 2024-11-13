'use client';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    // Add fade-in effect to the sections on page load
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
        <title>Terms of Service | ShopBuddy</title>
        <meta
          name="description"
          content="Terms and Conditions for ShopBuddy. Understand the rules and responsibilities when using our e-commerce website."
        />
      </Head>

      <div className="mx-auto bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-8 py-24 lg:px-20">
        <header className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button lg:text-4xl">
            Terms of Service
          </h1>
        </header>

        <section className="section mt-12 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Introduction
          </h2>
          <p className="mt-4 text-gray-600">
            Welcome to{' '}
            <span className="font-semibold text-button">ShopBuddy</span>. By
            using our website and services, you agree to the following terms and
            conditions. Please read them carefully.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Use of Our Service
          </h2>
          <p className="mt-4 text-gray-600">
            You must use our service in compliance with all applicable laws and
            regulations. You may not use the service to:
          </p>
          <ul className="ml-8 mt-4 list-disc text-gray-600">
            <li>Engage in fraudulent activities</li>
            <li>Infringe on intellectual property rights</li>
            <li>Post harmful, offensive, or illegal content</li>
          </ul>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Account Responsibilities
          </h2>
          <p className="mt-4 text-gray-600">
            You are responsible for maintaining the confidentiality of your
            account information and for all activities that occur under your
            account. You agree to immediately notify us of any unauthorized use
            of your account.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Product Information
          </h2>
          <p className="mt-4 text-gray-600">
            While we strive to provide accurate product descriptions, prices,
            and availability, we cannot guarantee the accuracy of the
            information provided. Prices and availability are subject to change
            without notice.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Payment Terms
          </h2>
          <p className="mt-4 text-gray-600">
            Payment for orders must be made via one of the accepted payment
            methods listed on our website. All payments are processed securely.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Shipping and Delivery
          </h2>
          <p className="mt-4 text-gray-600">
            We offer various shipping methods. Delivery times and fees vary
            depending on the shipping option you choose. Please review our
            shipping policy for more details.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Limitation of Liability
          </h2>
          <p className="mt-4 text-gray-600">
            ShopBuddy is not responsible for any damages, losses, or legal
            issues that arise from using our website, including errors,
            interruptions, or delays in service.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Governing Law
          </h2>
          <p className="mt-4 text-gray-600">
            These terms are governed by the laws of Nigeria. Any disputes will
            be resolved in the courts of Nigeria.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Changes to the Terms
          </h2>
          <p className="mt-4 text-gray-600">
            We reserve the right to modify these Terms of Service at any time.
            Any changes will be posted on this page with an updated effective
            date.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            Contact Us
          </h2>
          <p className="mt-4 text-gray-600">
            If you have any questions about these Terms of Service, please
            contact us at: support@shopbuddy.ng
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

export default TermsOfService;
