'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Corrected module import

import 'swiper/css'; // Core Swiper styles
import 'swiper/css/navigation'; // Navigation module styles
import 'swiper/css/pagination'; // Pagination module styles

import Image from 'next/image';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';

interface ProductDetailProps {
  product: {
    id: string;
    title: string;
    description: string;
    mainImage: string;
    galleryImages: string[];
    regularPrice: number;
    salePrice?: number;
    category: {
      name: string;
    } | null;
    createdAt: string;
  };
}

const ProductDetailComponent: React.FC<ProductDetailProps> = ({ product }) => {
  const images = [product.mainImage, ...product.galleryImages];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{product.title}</h1>
      </div>

      <div className="lg:flex lg:space-x-8">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          {/* Main Swiper for the main image */}
          <Swiper
            modules={[Navigation, Pagination]} // Corrected module usage
            spaceBetween={10}
            slidesPerView={1}
            navigation // Enable navigation (previous/next buttons)
            pagination={{ clickable: true }} // Enable pagination (dots)
            className="rounded-lg overflow-hidden border"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Product image ${index}`}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper for gallery images */}
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            className="mt-4"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="border rounded-md cursor-pointer overflow-hidden">
                  <Image
                    src={image}
                    alt={`Thumbnail ${index}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-4">
            <p className="text-lg">
              Regular Price:{' '}
              <span className="text-primary font-semibold">
                <CurrencyFormatter amount={product.regularPrice} />
              </span>
            </p>
            {product.salePrice && (
              <p className="text-lg">
                Sale Price:{' '}
                <span className="text-red-500 font-semibold">
                  <CurrencyFormatter amount={product.salePrice} />
                </span>
              </p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-lg">
              Category:{' '}
              <span className="text-gray-700">
                {product.category ? product.category.name : 'Uncategorized'}
              </span>
            </p>
          </div>

          <div className="mb-4">
            <p className="text-lg">
              Added on:{' '}
              <span className="text-gray-700">
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
