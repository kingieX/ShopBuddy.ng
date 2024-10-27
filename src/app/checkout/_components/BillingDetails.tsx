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
  const [towns, setTowns] = useState<City[]>([]);
  const [selectedTown, setSelectedTown] = useState<City | null>(null);
  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    town: '',
  });

  useEffect(() => {
    setStates(mockStatesData); // Load mock data, replace with actual fetching if needed
  }, []);

  useEffect(() => {
    const state = states.find((s) => s.name === selectedState);
    setTowns(state ? state.cities : []);
    setSelectedTown(null); // Reset town on state change
  }, [selectedState, states]);

  useEffect(() => {
    if (selectedTown) {
      onDeliveryFeeChange(selectedTown.deliveryFee);
      handleChange('town', selectedTown.name);
    }
  }, [selectedTown, onDeliveryFeeChange]);

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
            <label htmlFor="town" className="mb-1 text-sm text-gray-500">
              Town/City*
            </label>
            <select
              id="town"
              value={selectedTown?.name || ''}
              onChange={(e) =>
                setSelectedTown(
                  towns.find((town) => town.name === e.target.value) || null
                )
              }
              required
              className="px-2 py-2"
            >
              <option value="">Select Town/City</option>
              {towns.map((town) => (
                <option key={town.name} value={town.name}>
                  {town.name} (Delivery Fee:{' '}
                  <CurrencyFormatter amount={town.deliveryFee} />)
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillingDetails;
