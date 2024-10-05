'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';

interface PromotionDetailProps {
  promotion: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    isActive: boolean;
  };
}

const PromotionDetailComponent: React.FC<PromotionDetailProps> = ({
  promotion,
}) => {
  const images = [promotion.imageUrl];

  return (
    <div className="mx-0 max-w-sm rounded-md bg-white px-4 py-4 shadow-md lg:mx-auto lg:max-w-5xl lg:px-8 lg:py-8">
      <div className="flex flex-col-reverse lg:flex-row lg:space-x-8">
        <div className="w-full max-w-sm lg:mb-0 lg:w-1/2">
          {/* Main Swiper for the promotion image */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="overflow-hidden rounded-lg border"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Promotion image ${index}`}
                  width={600}
                  height={600}
                  className="h-auto w-full max-w-sm object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full px-8 lg:w-1/2">
          <div className="mb-2 flex flex-col items-start justify-center space-y-1 border-b pb-1">
            <h1 className="mb-2 text-2xl font-semibold lg:text-4xl">
              {promotion.title}
            </h1>
            <div className="flex place-items-baseline justify-center space-x-1 text-gray-500">
              <FaCalendarAlt className="text-blue-500" size={16} />
              <p>
                Start Date: {new Date(promotion.startDate).toLocaleDateString()}
              </p>
              <FaCalendarAlt className="ml-4 text-red-500" size={16} />
              <p>
                End Date: {new Date(promotion.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-4 flex flex-col items-start justify-center space-y-1 border-b pb-1">
            <h2 className="font-semibold">Promotion Details</h2>
            <p className="text-gray-700">{promotion.description}</p>
          </div>

          <div className="mb-4 flex flex-col items-start justify-center space-y-1">
            <h2 className="font-semibold">
              Status: {promotion.isActive ? 'Active' : 'Inactive'}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetailComponent;
