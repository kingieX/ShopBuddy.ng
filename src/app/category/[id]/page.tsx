import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/NavBar';
import CategoryProductsPage from './_components/CategoryProducts';

export default function Category() {
  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="py-10">
        <CategoryProductsPage />
      </div>
      <Footer />
    </>
  );
}
