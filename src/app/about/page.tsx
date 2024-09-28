'use client';
import Image from 'next/image';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import StatsSection from './_components/StatCard';
import TestimonialsSection from './_components/TestimonialsSection';
import ExtrasSection from './_components/Extras';

const About = () => {
  return (
    <>
      <Navbar isSignedIn={true} isAuthPage={false} profileImage="" />

      {/* Hero Section */}
      <section className="bg-white px-8 py-16">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center lg:ml-8">
            <h1 className="mb-4 text-4xl font-bold">Our Story</h1>
            <p className="text-muted-foreground mb-6 text-lg">
              Welcome to ShopBuddy! We are passionate about bringing the best
              products and deals to our customers. Our story started with a
              simple mission: making shopping fun and rewarding for everyone.
            </p>
            <p className="text-muted-foreground text-lg">
              Over the years, we’ve grown from a small online store to a large
              community with thousands of satisfied customers. Thank you for
              being part of our journey!
            </p>
          </div>
          <div className="flex justify-center lg:-mr-8">
            <Image
              src="/assets/about-image.jpg" // Replace with the actual image path
              alt="Our Story Image"
              width={500}
              height={500}
              className="rounded-lg object-cover shadow-lg lg:w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials/Featured Products Section */}
      <TestimonialsSection />

      {/* Extras */}
      <ExtrasSection />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;
