'use client';
import Head from 'next/head';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const FAQ = () => {
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
        <title>FAQ | ShopBuddy</title>
        <meta
          name="description"
          content="Frequently Asked Questions for ShopBuddy E-commerce site in Nigeria. Find answers to common questions about orders, payments, delivery, and more."
        />
      </Head>

      <div className="mx-auto bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-8 py-24 lg:px-20">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 transition duration-300 hover:text-button lg:text-4xl">
            Frequently Asked Questions (FAQ)
          </h1>
        </header>

        <section className="section mt-12 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            1. How do I place an order on ShopBuddy?
          </h2>
          <p className="mt-2 text-gray-600">
            To place an order, browse our products, select the ones you want to
            purchase, and click the "Add to Cart" button. Once you're ready,
            click on the cart icon to review your items and proceed to checkout.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            2. What payment methods do you accept?
          </h2>
          <p className="mt-2 text-gray-600">
            We accept various payment methods using Paystack payment including:
            <ul className="ml-8 mt-2 list-disc text-gray-600">
              <li>Bank transfers</li>
              <li>Debit/Credit cards (Visa, MasterCard, Verve)</li>
            </ul>
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            3. Do you offer cash on delivery?
          </h2>
          <p className="mt-2 text-gray-600">
            No, we do not offer cash on delivery (COD) for select locations
            across Ebonyi State. When placing an order, you can choose the
            payment option at checkout to make your payment.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            4. How long does delivery take?
          </h2>
          <p className="mt-2 text-gray-600">
            Delivery times vary based on your location. Typically, orders within
            major places like Perm site, Presco, Ishieke, and other place in
            Abakaliki will be delivered within 3-4 hours, while orders to remote
            areas may take 24-48 hours.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            5. Can I track my order?
          </h2>
          <p className="mt-2 text-gray-600">
            Yes, once your order has been shipped, you will receive an email and
            an sms with a tracking number and instructions on how to track your
            order.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            6. What should I do if I receive a damaged or wrong item?
          </h2>
          <p className="mt-2 text-gray-600">
            If you receive a damaged or incorrect item, please contact our
            customer service team immediately at{' '}
            <span className="font-semibold">support@shopbuddy.ng</span> or call
            <span className="font-semibold">09065957905</span>. We will resolve
            the issue as soon as possible.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            7. Do you offer inter-state shipping?
          </h2>
          <p className="mt-2 text-gray-600">
            Currently, we only offer delivery within Ebonyi state. We are
            working on expanding our services to other states in the near
            future.
          </p>
        </section>

        {/* <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            8. How do I return or exchange an item?
          </h2>
          <p className="mt-2 text-gray-600">
            If you're not satisfied with your purchase, you can return or
            exchange the item within 7 days of receiving it. Please ensure the
            item is unused, in its original packaging, and has all tags intact.
            Contact our customer service team to initiate the return or exchange
            process.
          </p>
        </section> */}

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            8. Are your products authentic?
          </h2>
          <p className="mt-2 text-gray-600">
            Yes, all products sold on ShopBuddy are authentic and sourced from
            trusted suppliers and manufacturers. We strive to offer the best
            quality products to our customers.
          </p>
        </section>

        <section className="section mt-8 rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 transition duration-300 hover:text-button">
            9. How can I contact customer support?
          </h2>
          <p className="mt-2 text-gray-600">
            You can contact our customer support team via email at{' '}
            <span className="font-semibold">support@shopbuddy.ng</span> or call
            <span className="font-semibold">09065957905</span>. We are available
            Monday to Friday, 9 AM to 6 PM.
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

export default FAQ;
