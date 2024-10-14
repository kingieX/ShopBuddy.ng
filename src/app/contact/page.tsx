'use client';
import { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { IoCallOutline, IoMailOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage('Your message has been sent successfully!');
        toast.success('Your message has been sent successfully!', {
          duration: 4000, // Toast shows for 4 seconds
        });
        // Reset the form data after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setSuccessMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSuccessMessage('An error occurred. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <Navbar isAuthPage={false} />
      <section className="py-12">
        <div className="container mx-auto py-16 lg:px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            <div className="col-span-2 rounded-lg p-8 lg:bg-gray-50">
              {/* Contact Info */}
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

            {/* Contact Form */}
            <div className="col-span-3 rounded-lg bg-white p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="col-span-1">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone *"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500"
                    rows={4}
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-button px-4 py-3 text-white hover:bg-blue-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {successMessage && (
                  <div className="mt-4 text-center text-green-500">
                    {successMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
