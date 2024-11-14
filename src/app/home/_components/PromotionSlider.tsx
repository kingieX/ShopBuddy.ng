'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Promotion {
  id: number;
  title: string;
  description: string;
  startDate: string; // ISO string format
  endDate: string; // ISO string format
  imageUrl: string;
}

const PromotionSlider: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [countdownMap, setCountdownMap] = useState<{ [key: number]: string }>(
    {}
  );
  const navigate = useRouter();

  const handleShopNow = () => {
    navigate.push('/products');
  };

  // Fetch promotions
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch('/api/admin/promotions');
        const data: Promotion[] = await response.json();
        setPromotions(data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    fetchPromotions();
  }, []);

  // Countdown logic

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns = promotions.reduce(
        (acc, promotion) => {
          acc[promotion.id] = getCountdown(promotion.endDate);
          return acc;
        },
        {} as { [key: number]: string }
      );
      setCountdownMap(newCountdowns);
    };

    // Update countdowns immediately on mount
    updateCountdowns();

    // Set an interval to update countdowns every second
    const intervalId = setInterval(() => {
      updateCountdowns();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [promotions]);

  // Countdown logic
  const getCountdown = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const difference = end - now;

    if (difference < 0) return 'Promotion Ended';

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  return (
    <div className="">
      {/* Render Swiper only if there are 2 or more promotions */}
      {promotions.length > 1 ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          className="flex flex-row items-center justify-center rounded-lg bg-black p-4 lg:p-6"
        >
          {promotions.map((promotion, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-row items-center justify-between rounded-lg p-4 lg:p-6">
                <div className="w-full py-8 text-white lg:w-1/2">
                  <h3 className="text-3xl font-bold lg:mb-2 lg:text-4xl">
                    {promotion.title}
                  </h3>
                  <p className="mb-2 text-sm lg:mb-4 lg:text-xl">
                    {promotion.description}
                  </p>
                  <p className="mb-4 text-sm font-semibold lg:text-lg">
                    Ends in: {countdownMap[promotion.id] || 'Loading...'}
                  </p>
                  <button
                    onClick={handleShopNow}
                    className="mt-2 rounded bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-200"
                  >
                    Shop Now →
                  </button>
                </div>
                <div className="w-3/5 lg:w-1/2">
                  <Image
                    src={promotion.imageUrl}
                    alt={promotion.title}
                    width={1500}
                    height={1500}
                    className="h-full w-full rounded-lg object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Fallback for only one promotion
        promotions.length === 1 && (
          <div className="flex flex-row items-center justify-between rounded-lg bg-black p-4 lg:p-6">
            <div className="w-full text-white lg:w-1/2">
              <h3 className="text-3xl font-bold lg:mb-2 lg:text-4xl">
                {promotions[0].title}
              </h3>
              <p className="mb-2 text-sm lg:mb-4 lg:text-xl">
                {promotions[0].description}
              </p>
              <p className="mb-4 text-sm font-semibold lg:text-lg">
                Ends in: {countdownMap[promotions[0].id] || 'Loading...'}
              </p>
              <button className="mt-2 rounded bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-200">
                Shop Now →
              </button>
            </div>
            <div className="w-2/5 lg:w-1/2">
              <Image
                src={promotions[0].imageUrl}
                alt={promotions[0].title}
                width={1500}
                height={1500}
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PromotionSlider;
