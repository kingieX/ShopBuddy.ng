'use client';

import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';
import { useState, useEffect } from 'react';
import mockStatesData from '../checkout/_components/mockStatesData';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import { useRouter } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface City {
  name: string;
  deliveryFee: number;
}

interface State {
  name: string;
  cities: City[];
}

const AddressBook = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [states, setStates] = useState<State[]>(mockStatesData);
  const [selectedState, setSelectedState] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
  });

  const router = useRouter();

  useEffect(() => {
    const fetchBillingDetails = async () => {
      try {
        const response = await fetch('/api/billing-details');
        const data = await response.json();

        if (data) {
          setFormValues({
            fullname: data.fullname || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            state: data.state || '',
            city: data.city || '',
          });
          setSelectedState(data.state || '');
          setSelectedCity(
            mockStatesData
              .find((state) => state.name === data.state)
              ?.cities.find((city) => city.name === data.city) || null
          );
        }
      } catch (error) {
        console.error('Error fetching billing details:', error);
      }
    };

    fetchBillingDetails();
  }, []);

  useEffect(() => {
    const state = states.find((s) => s.name === selectedState);
    setCities(state ? state.cities : []);
    setSelectedCity(null); // Reset town on state change
  }, [selectedState, states]);

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setIsLoading(true);
      const response = await fetch('/api/billing-details', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // router.push('/'); // Redirect or show success message
        toast.success('Address book updated successfully');
        setSuccess('Address book updated successfully');
      } else {
        console.error('Failed to update address details');
        setError('Failed to update address details');
      }
    } catch (error) {
      setError('Error updating details');
      console.error('Error updating billing details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="flex min-h-screen w-full flex-col px-8 py-20 lg:px-14">
        <div className="flex w-full items-center justify-between py-4 lg:py-8">
          <header className="stick z-5 bg-background top-0 hidden h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:flex">
            <Breadcrumb className="flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>My Address Book</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="mt-2 lg:hidden">
            <SideMenu />
          </div>
        </div>

        <div className="mt-2 flex w-full lg:gap-8">
          <div className="hidden lg:block">
            <SideMenu />
          </div>
          <div className="w-full p-8">
            <h2 className="mb-4 text-xl font-semibold lg:text-2xl">
              Address Book
            </h2>
            <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={formValues.fullname}
                onChange={(e) => handleChange('fullname', e.target.value)}
                className="bg-gray-100 px-4 py-2 outline-button"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="bg-gray-100 px-4 py-2 outline-button"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formValues.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="bg-gray-100 px-4 py-2 outline-button"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={formValues.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="bg-gray-100 px-4 py-2 outline-button"
                required
              />
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  handleChange('state', e.target.value);
                }}
                className="px-2 py-2"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedCity?.name || ''}
                onChange={(e) =>
                  setSelectedCity(
                    cities.find((city) => city.name === e.target.value) || null
                  )
                }
                className="px-2 py-2"
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name} (Delivery Fee:{' '}
                    <CurrencyFormatter amount={city.deliveryFee} />)
                  </option>
                ))}
              </select>
              <button
                disabled={isloading}
                className="mt-6 rounded-lg bg-button px-4 py-2 text-white hover:bg-blue-500"
              >
                {/* Update Address */}
                {isloading ? 'Updating...' : 'Update Address'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddressBook;
