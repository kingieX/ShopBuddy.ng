import ExtrasSection from '../about/_components/Extras';
import CategoryProductSection from './_components/CategoryProductSection';
import MenuBar from './_components/MenuBar';
import PromotionSlider from './_components/PromotionSlider';

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen pt-14 sm:py-16">
        <div className="flex w-full items-start px-4 lg:justify-between lg:gap-12 lg:px-20">
          {/* sidebar */}
          <MenuBar />
          {/* <div className="h-56 w-full bg-black text-white">promotion</div> */}
          <div className="mt-8 w-full lg:w-3/4">
            <PromotionSlider />
          </div>
        </div>
        <div className="px-4 py-8 lg:px-20">
          <CategoryProductSection />
        </div>

        {/* Extras */}
        <div>
          <ExtrasSection />
        </div>
      </div>
    </>
  );
}