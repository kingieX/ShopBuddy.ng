// Import necessary dependencies
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Pagination from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// TestimonialCard component
const TestimonialCard = ({
  image,
  title,
  testimonial,
}: {
  image: string;
  title: string;
  testimonial: string;
}) => {
  return (
    <div className="group relative transform rounded-lg bg-gray-100 p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <Image
        src={image}
        alt={title}
        width={300}
        height={250}
        className="mb-4 w-full rounded-lg bg-white object-cover"
      />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{testimonial}</p>

      {/* Additional hover animation */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-200 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
    </div>
  );
};

// TestimonialsSection component with Swiper slider
const TestimonialsSection = () => {
  // Testimonials Data
  const testimonials = [
    {
      image: '/assets/product1.jpg',
      title: 'Testimonial 1',
      testimonial:
        "This is the best store I've ever shopped at. The quality is great!",
    },
    {
      image: '/assets/product2.jpg',
      title: 'Testimonial 2',
      testimonial: 'Amazing customer service and fast delivery!',
    },
    {
      image: '/assets/product3.jpg',
      title: 'Testimonial 3',
      testimonial:
        'The products exceeded my expectations. I highly recommend ShopBuddy!',
    },
    {
      image: '/assets/product4.jpg',
      title: 'Testimonial 4',
      testimonial:
        'I love the variety of products available. Will definitely shop again!',
    },
    {
      image: '/assets/product5.jpg',
      title: 'Testimonial 5',
      testimonial:
        'The customer service is top-notch. I had a great shopping experience!',
    },
  ];

  return (
    <section className="px-8 py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold">Testimonials</h2>

        {/* Testimonial Slider using Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard
                image={testimonial.image}
                title={testimonial.title}
                testimonial={testimonial.testimonial}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
