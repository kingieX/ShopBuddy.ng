'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Corrected module import

import 'swiper/css'; // Core Swiper styles
import 'swiper/css/navigation'; // Navigation module styles
import 'swiper/css/pagination'; // Pagination module styles

import Image from 'next/image';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import { FaStar } from 'react-icons/fa';
import ProductDetails from '../../_components/ProductDetails';
import RatingReviews from '../../_components/RatingReviews';

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
    <div className="lg:max-w-5xl max-w-sm lg:mx-auto mx-0 lg:px-8 lg:py-8 px-4 py-4 bg-white rounded-md shadow-md">
      
      <div className="flex lg:flex-row flex-col-reverse lg:space-x-8">
        <div className="w-full max-w-sm lg:w-1/2 lg:mb-0">
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
                  className="object-cover w-full h-auto max-w-sm " // Smaller height on mobile
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper for gallery images */}
          <Swiper
            spaceBetween={10}
            slidesPerView={2} // Show only 2 slides on mobile
            breakpoints={{
              640: { slidesPerView: 3 }, // Show 3 slides on tablets
              1024: { slidesPerView: 4 }, // Show 4 slides on larger screens
            }}
            className="mt-4"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="border rounded-md max-w-sm cursor-pointer overflow-hidden">
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

        <div className="lg:w-1/2 w-full px-8">
          <div className="flex flex-col justify-center items-start space-y-1 border-b pb-1 mb-2">
            <h1 className="lg:text-4xl text-2xl font-semibold mb-2">{product.title}</h1>
            <div className='flex justify-center place-items-baseline text-gray-500 space-x-1'>
              {/* <StarRating rating={2.2} /> */}
              <p>4.4</p>
              <FaStar className="text-yellow-500" size={12} />
              <p>(525) Customer Reviews</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start space-y-1 border-b pb-1 mb-2">
            <div className='flex justify-start place-items-baseline space-x-1'>
              {product.salePrice !== product.regularPrice ? (
                <span className="text-gray-700 font-semibold">
                  <CurrencyFormatter amount={product.salePrice} />
                </span>
              ) : (
                <span className="text-gray-700 font-semibold">
                  <CurrencyFormatter amount={product.regularPrice} />
                </span>
              )}

              {product.salePrice !== product.regularPrice ? (
                <span className="text-gray-500 line-through">
                  <CurrencyFormatter amount={product.regularPrice} />
                </span>
              ) : (
                ''
              )}
              <span className='text-yellow-500'>(x% off)</span>
            </div>
            <div className="mb-4">
              <p className="text-lg text-gray-700 font-semibold">
                  {product.category ? product.category.name : 'Uncategorized'}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start space-y-1 border-b pb-1">
            <h2 className='font-semibold'>
              Product Details
            </h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div>
            <ProductDetails />
          </div>

          <div className=''>
            <RatingReviews />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
