// BillingDetails.tsx
'use client';
import React, { useState, useEffect } from 'react';
import mockStatesData from './mockStatesData';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';

interface City {
  name: string;
  deliveryFee: number;
}

interface State {
  name: string;
  cities: City[];
}

interface BillingDetailsProps {
  onDeliveryFeeChange: (fee: number) => void;
  onBillingDetailsChange: (details: any) => void;
}

const BillingDetails: React.FC<BillingDetailsProps> = ({
  onDeliveryFeeChange,
  onBillingDetailsChange,
}) => {
  const [states, setStates] = useState<State[]>([]);
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

  useEffect(() => {
    setStates(mockStatesData); // Load mock data, replace with actual fetching if needed
  }, []);

  useEffect(() => {
    const state = states.find((s) => s.name === selectedState);
    setCities(state ? state.cities : []);
    setSelectedCity(null); // Reset town on state change
  }, [selectedState, states]);

  useEffect(() => {
    if (selectedCity) {
      onDeliveryFeeChange(selectedCity.deliveryFee);
      handleChange('city', selectedCity.name);
    }
  }, [selectedCity, onDeliveryFeeChange]);

  useEffect(() => {
    const fetchBillingDetails = async () => {
      const response = await fetch('/api/billing-details');
      const data = await response.json();

      console.log('data', data);

      if (data) {
        const billingData = data;
        setFormValues({
          fullname: billingData.fullname || '',
          email: billingData.email || '',
          phone: billingData.phone || '',
          address: billingData.address || '',
          state: billingData.state || '',
          city: billingData.city || '',
        });

        setSelectedState(billingData.state || '');
        setSelectedCity(
          mockStatesData
            .find((state) => state.name === billingData.state)
            ?.cities.find((city) => city.name === billingData.city) || null
        );
      }

      console.log('Form values:', formValues); // Check the values here
    };

    fetchBillingDetails();
  }, []);

  const handleChange = (field: string, value: string) => {
    const updatedFormValues = { ...formValues, [field]: value };
    setFormValues(updatedFormValues);
    onBillingDetailsChange(updatedFormValues);
  };

  return (
    <div className="lg:pr-8">
      <h2 className="mb-4 text-xl font-semibold lg:text-2xl">
        Billing Details
      </h2>
      <form className="flex flex-col gap-4 py-4">
        <div className="flex flex-col">
          <label htmlFor="fullname" className="mb-1 text-sm text-gray-500">
            Full Name*
          </label>
          <input
            type="text"
            id="fullname"
            value={formValues.fullname}
            onChange={(e) => handleChange('fullname', e.target.value)}
            required
            className="bg-gray-100 px-4 py-2 outline-button"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm text-gray-500">
            Email*
          </label>
          <input
            type="email"
            id="email"
            value={formValues.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="bg-gray-100 px-4 py-2 outline-button"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 text-sm text-gray-500">
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            value={formValues.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            className="bg-gray-100 px-4 py-2 outline-button"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1 text-sm text-gray-500">
            Address*
          </label>
          <input
            type="text"
            id="address"
            value={formValues.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
            className="bg-gray-100 px-4 py-2 outline-button"
          />
        </div>

        <div className="flex w-full justify-between gap-4">
          <div className="flex w-1/2 flex-col">
            <label htmlFor="state" className="mb-1 text-sm text-gray-500">
              State*
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                handleChange('state', e.target.value);
              }}
              required
              className="px-2 py-2"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-1/2 flex-col">
            <label htmlFor="city" className="mb-1 text-sm text-gray-500">
              Town/City*
            </label>
            <select
              id="city"
              value={selectedCity?.name || ''}
              onChange={(e) =>
                setSelectedCity(
                  cities.find((city) => city.name === e.target.value) || null
                )
              }
              required
              className="px-2 py-2"
            >
              <option value="">Select Town/City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name} (Delivery Fee:{' '}
                  <CurrencyFormatter amount={city.deliveryFee} />)
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* checked to save data for next time */}
        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="save-data"
            className="h-4 w-4 text-gray-600"
          />
          <label htmlFor="save-data" className="text-sm text-gray-500">
            Save my billing details for future purchases
          </label>
        </div> */}
      </form>
    </div>
  );
};

export default BillingDetails;