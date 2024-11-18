'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Set target date to November 20th, 2024 (Wednesday)
const targetDate = new Date('2024-11-21T00:00:00Z'); // UTC time
targetDate.setHours(targetDate.getHours() - 1); // Adjust to Lagos time (GMT+1)

const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Function to update the countdown every second
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        // Countdown finished, show content
        setIsExpired(true);
        clearInterval(interval); // Clear the interval when countdown finishes
      } else {
        // Calculate time left
        const newDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const newHours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const newMinutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const newSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setDays(newDays);
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);

        // Set time left string in format "DAYS HH:MM:SS"
        setTimeLeft(`${newDays}d ${newHours}h ${newMinutes}m ${newSeconds}s`);
      }
    }, 1000); // Update every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleProceed = () => {
    // Once the countdown expires, allow navigation to the rest of the website
    if (isExpired) {
      // Close the modal and redirect to homepage or dashboard, etc.
      router.push('/');
    }
  };

  // A helper function to generate the animated "falling" effect
  const animateCountdown = (value: number) => {
    return (
      <div className="countdown-container">
        {Array.from(String(value).padStart(2, '0')).map((char, idx) => (
          <div key={idx} className="countdown-item">
            <div className="countdown-number">{char}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-800 text-white">
      {/* Countdown Modal */}
      <div className="absolute inset-0 z-50 bg-black opacity-50" />
      <div className="z-50 mx-auto max-w-sm rounded-lg bg-white p-8 text-black shadow-lg lg:max-w-2xl">
        <h2 className="mb-4 text-center text-4xl font-semibold lg:text-6xl">
          Launching Soon!
        </h2>
        <p className="mb-6 text-center text-xl">
          <span className="font-semibold">ShopBuddy</span> will be live in:
        </p>

        <div className="mb-6 flex justify-center space-x-4">
          {/* Days */}
          <div className="flex flex-col items-center justify-center gap-4">
            {animateCountdown(days)}
            <p className="font-bold lg:text-4xl">DAY</p>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center gap-4">
            {animateCountdown(hours)}
            <p className="font-bold lg:text-4xl">HOUR</p>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center gap-4">
            {animateCountdown(minutes)}
            <p className="font-bold lg:text-4xl">MIN</p>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center gap-4">
            {animateCountdown(seconds)}
            <p className="font-bold lg:text-4xl">SEC</p>
          </div>
        </div>

        <div className="flex justify-center">
          {isExpired ? (
            <button
              onClick={handleProceed}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Enter Site
            </button>
          ) : (
            <button
              disabled
              className="cursor-not-allowed rounded-lg bg-gray-400 px-6 py-3 font-semibold text-white"
            >
              Please Wait...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;
