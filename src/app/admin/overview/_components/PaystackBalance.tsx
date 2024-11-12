'use client';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import { useEffect, useState } from 'react';

function PaystackBalance() {
  const [balance, setBalance] = useState<{
    currency: string;
    balance: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const response = await fetch('/api/admin/paystack-balance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        const data = await response.json();
        // Assuming the response data follows the structure: { status, message, data: [{ currency, balance }] }
        if (data && data.data && data.data.length > 0) {
          // Extracting the first item from the `data` array
          setBalance(data.data[0]);
          console.log('Balance: ', data.data[0]);
        } else {
          throw new Error('No balance data available');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchBalance();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {balance ? (
        <div>
          <p>
            <CurrencyFormatter amount={balance.balance / 100} />
          </p>
        </div>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
}

export default PaystackBalance;
