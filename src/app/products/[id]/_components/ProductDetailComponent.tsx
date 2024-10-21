'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import RatingReviews from '@/app/admin/products/_components/RatingReviews';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ProductDetails from '@/app/admin/products/_components/ProductDetails';
import ProductActionComponent from './ProductActionComponent';
import { TbTruckDelivery } from 'react-icons/tb';
import { RiCustomerService2Fill } from 'react-icons/ri';
import RelatedProducts from './RelatedProducts';

interface ProductDetailProps {
  product: {
    id: string;
    title: string;
    description: string;
    mainImage: string;
    galleryImages: string[];
    regularPrice: number;
    salePrice?: number | null;
    status: string;
    category: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
  };
}

const ProductDetailComponent: React.FC<ProductDetailProps> = ({ product }) => {
  const images = [product.mainImage, ...product.galleryImages];
  const [selectedImage, setSelectedImage] = useState(product.mainImage);

  // Calculate discount percentage if sale price is given
  const discountPercentage = product.salePrice
    ? Math.round(
        ((product.regularPrice - product.salePrice) / product.regularPrice) *
          100
      )
    : 0;

  // console.log('Product:', product);

  return (
    <div className="px-4 py-8 lg:px-20">
      {/* header */}
      <header className="stick z-5 top-0 mb-8 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 py-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className="hover:underline" href="/">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className="hover:underline" href="/products">
                  All Products
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Product details */}
      <div className="mx-0 flex max-w-sm rounded-md bg-white px-4 py-4 shadow-md lg:mx-auto lg:max-w-6xl lg:px-8 lg:py-8">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:space-x-8">
          <div className="w-full max-w-sm lg:mb-0 lg:w-1/2">
            {/* Main Image */}
            <div className="mb-4 overflow-hidden rounded-lg border bg-[#F5F5F5] p-4">
              <Image
                src={selectedImage}
                alt="Selected Product Image"
                width={2000}
                height={2000}
                className="h-auto w-full max-w-sm object-cover"
              />
            </div>

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
                  <div
                    className="max-w-sm cursor-pointer overflow-hidden rounded-md border bg-[#F5F5F5]"
                    onClick={() => setSelectedImage(image)} // Set the clicked image as the selected one
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index}`}
                      width={1000}
                      height={1000}
                      className={`h-full w-full object-cover p-2 ${
                        selectedImage === image
                          ? 'border-2 border-blue-500'
                          : ''
                      }`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full px-2 lg:w-1/2 lg:px-8">
            {/* product detail */}
            <div className="mb-2 flex flex-col items-start justify-center space-y-1 border-b border-b-gray-400 pb-1">
              <h1 className="text-2xl font-semibold lg:text-4xl">
                {product.title}
              </h1>
              <div className="flex place-items-baseline justify-center space-x-1 text-sm text-gray-500">
                <p>4.4</p>
                <FaStar className="text-yellow-500" size={12} />
                <p>(525) Reviews</p>
                <p> | </p>
                <p>
                  {product.status == 'on_sale' ? (
                    <span className="text-green-600">In stock</span>
                  ) : (
                    <span className="text-red-600">Out of stock</span>
                  )}
                </p>
              </div>
              {/* Price display with regular and sale price logic */}
              <div className="flex place-items-center justify-start space-x-1 py-2">
                {product.salePrice ? (
                  <>
                    <span className="text-xl font-bold text-gray-900">
                      <CurrencyFormatter amount={product.salePrice} />
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      <CurrencyFormatter amount={product.regularPrice} />
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-gray-900">
                    <CurrencyFormatter amount={product.regularPrice} />
                  </span>
                )}
                {/* Discount percentage box */}
                {product.salePrice && (
                  <div className="px-2 py-1 text-sm font-bold text-green-500">
                    -{discountPercentage}% off
                  </div>
                )}
              </div>
              <div className="pb-2">
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
            </div>

            {/* product price & Total order */}
            <ProductActionComponent productId={product.id} />

            {/* Delivery and Return Info */}
            <div className="my-4 mt-4 w-full space-y-2 border">
              <div className="flex items-center space-x-4 border-b px-4 py-4">
                <span className="">
                  <TbTruckDelivery size={32} />
                </span>
                <span>
                  Fast Delivery <br />
                  <span className="text-sm text-gray-500">
                    Get your items delivered 24 hours after making an order
                    around Abakaliki and 48 hours outside Abakaliki.
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-4 px-4 py-4">
                <span className="">
                  <RiCustomerService2Fill size={32} />
                </span>
                <span>
                  24/7 Customer Service <br />
                  <span className="text-sm text-gray-500">
                    Get friendly customer support on anything issue.
                  </span>
                </span>
              </div>
            </div>

            {/* Exttra details: Policy, tearm & conditions */}
            <div>{/* <ProductDetails /> */}</div>

            {/* <div className="">
              <RatingReviews />
            </div> */}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="w-full">
        <RelatedProducts product={product} />
      </div>
    </div>
  );
};

export default ProductDetailComponent;
