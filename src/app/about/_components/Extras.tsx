import { BiStore } from 'react-icons/bi';
import { AiOutlineDollar } from 'react-icons/ai';
import { RiShoppingBag3Line } from 'react-icons/ri';

interface StatCardProps {
  title: string;
  desc: string;
  icon: JSX.Element;
  bgColor: string; // Dynamic background color
}

const ExtraCard = ({ title, desc, icon, bgColor }: StatCardProps) => {
  return (
    <div
      className={`group flex flex-col items-center justify-center rounded-full px-6 py-6 text-center ${bgColor}`}
    >
      {/* Icon container */}
      <div className="mb-4 rounded-full bg-black p-2 text-4xl text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>{' '}
      {/* Formats number with commas */}
      <p className="mt-2 text-sm">{desc}</p>
    </div>
  );
};

const extras = [
  {
    title: 'FAST DELIVERY',
    desc: 'Delivery Across Ebonyi State',
    icon: <BiStore />,
    bgColor: 'bg-white',
  },
  {
    title: '24/7 CUSTOMER SERVICE',
    desc: 'Friendly 24/7 customer support',
    icon: <AiOutlineDollar />,
    bgColor: 'bg-white',
  },
  {
    title: 'Wide Variety products',
    desc: 'Shop over 10,000 items',
    icon: <RiShoppingBag3Line />,
    bgColor: 'bg-white',
  },
];

const ExtrasSection = () => {
  return (
    <section className="px-8 py-4 lg:py-12">
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        {extras.map((extra, index) => (
          <ExtraCard
            key={index}
            title={extra.title}
            desc={extra.desc}
            icon={extra.icon}
            bgColor={extra.bgColor}
          />
        ))}
      </div>
    </section>
  );
};

export default ExtrasSection;
