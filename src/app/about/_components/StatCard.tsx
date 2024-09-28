import { useEffect, useState } from 'react';
import { BiStore } from 'react-icons/bi';
import { AiOutlineDollar } from 'react-icons/ai';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { FaSackDollar } from 'react-icons/fa6';

interface StatCardProps {
  title: string;
  value: number; // Final number value
  icon: JSX.Element;
  bgColor: string; // Dynamic background color
}

const StatCard = ({ title, value, icon, bgColor }: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000; // Faster 1-second duration for the counting animation
    const stepTime = Math.max(Math.floor(duration / end), 1); // Ensure the interval isn't 0

    const counter = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime)); // Increase faster
      if (start >= end) {
        setCount(end); // Ensure final value is accurate
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(counter); // Cleanup interval on component unmount
  }, [value]);

  return (
    <div
      className={`group flex flex-col items-center justify-center rounded-lg border px-6 py-12 text-center transition-all duration-300 ease-in-out ${bgColor} hover:bg-blue-600 hover:text-white`}
    >
      {/* Icon container */}
      <div className="mb-4 rounded-full bg-black p-2 text-4xl text-white transition-all duration-300 ease-in-out group-hover:bg-white group-hover:text-black">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold">{count.toLocaleString()}</h3>{' '}
      {/* Formats number with commas */}
      <p className="mt-2 text-sm">{title}</p>
    </div>
  );
};

const stats = [
  {
    title: 'Products active on our site',
    value: 10500, // Updated to number for animation
    icon: <BiStore />,
    bgColor: 'bg-white',
  },
  {
    title: 'Monthly Product Sale',
    value: 33000, // Updated to number for animation
    icon: <AiOutlineDollar />,
    bgColor: 'bg-white',
  },
  {
    title: 'Customers active on our site',
    value: 45500, // Updated to number for animation
    icon: <RiShoppingBag3Line />,
    bgColor: 'bg-white',
  },
  {
    title: 'Annual gross sale in our site',
    value: 25000, // Updated to number for animation
    icon: <FaSackDollar />,
    bgColor: 'bg-white',
  },
];

const StatsSection = () => {
  return (
    <section className="px-8 py-4 lg:py-12">
      <div className="container mx-auto grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
