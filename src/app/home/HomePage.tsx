import ExtrasSection from '../about/_components/Extras';
import BackToTop from '../components/BackToTop';
import AllProductSection from './_components/AllProductSection';
import CategoryProductSection from './_components/CategoryProductSection';
import CountdownPage from './_components/CountdownPage';
import DiscountAd from './_components/DiscountAd';
import Hero from './_components/Hero';
import MenuBar from './_components/MenuBar';
import PromotionSlider from './_components/PromotionSlider';
import PromotionStatic from './_components/PromotionStatic';
import SearchProducts from './_components/SearchProducts';
import WhatsAppOrder from './_components/WhatsAppOrder';

export default function HomePage() {
  return (
    <>
      {/* countdown */}
      {/* <CountdownPage /> */}
      {/* adverts */}
      <div>
        <WhatsAppOrder />
        <DiscountAd />
      </div>

      <div className="relative min-h-screen pt-14 sm:py-16">
        <div className="flex w-full items-start px-0 lg:justify-between lg:gap-12 lg:px-20">
          {/* sidebar */}
          <MenuBar />
          {/* <div className="h-56 w-full bg-black text-white">promotion</div> */}
          <div className="mt- w-full lg:w-3/4">
            <Hero />
          </div>
        </div>

        {/* Search */}
        <div className="px-8 lg:px-20 lg:py-1">
          <SearchProducts />
        </div>

        <div className="px-0 lg:px-20 lg:py-8">
          <PromotionSlider />
        </div>
        <div className="px-4 py-8 lg:px-20">
          <CategoryProductSection />
        </div>

        <div className="w-full px-0 lg:px-20 lg:py-8">
          <PromotionStatic />
        </div>

        <div className="px-4 py-8 lg:px-20">
          <AllProductSection />
        </div>

        {/* Extras */}
        <div>
          <ExtrasSection />
        </div>
        <BackToTop />
      </div>
    </>
  );
}
