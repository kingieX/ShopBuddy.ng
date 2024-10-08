// pages/contact.tsx
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

import { IoCallOutline } from 'react-icons/io5';
import { IoMailOutline } from 'react-icons/io5';

const ContactPage = () => {
  return (
    <div>
      {/* Import the Navbar */}
      <Navbar isAuthPage={false} />

      {/* Contact Page Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          {/* <div className="mb-6 text-sm text-gray-500">
            Home / <span className="text-gray-900">Contact</span>
          </div> */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {/* Contact Information - 1/4 of the width */}
            <div className="col-span-2 rounded-lg bg-gray-50 p-8">
              <div className="mb-6">
                <div className="mb-6 flex items-center space-x-2">
                  <div className="flex items-center justify-center rounded-full bg-button">
                    <IoCallOutline className="h-8 w-8 p-2 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold">Call To Us</h2>
                </div>
                <p className="text-gray-600">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="mt-2">
                  <strong>Phone:</strong> +2348111112222
                </p>
              </div>

              <div className="mb-4 border-b"></div>

              <div>
                <div className="mb-6 flex items-center space-x-2">
                  <div className="flex items-center justify-center rounded-full bg-button">
                    <IoMailOutline className="h-8 w-8 p-2 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold">Write To Us</h2>
                </div>
                <p className="text-gray-600">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> customer@shopbuddy.ng
                </p>
                <p>
                  <strong>Email:</strong> support@shopbuddy.ng
                </p>
              </div>
            </div>

            {/* Contact Form - 3/4 of the width */}
            <div className="col-span-3 rounded-lg bg-white p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="col-span-1 md:col-span-1">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <input
                      type="email"
                      placeholder="Your Email *"
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <input
                      type="tel"
                      placeholder="Your Phone *"
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500"
                    rows={4}
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-button px-4 py-3 text-white hover:bg-blue-600"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Import the Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
