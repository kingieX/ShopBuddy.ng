import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import AllProductsPage from './_components/AllProducts';

export default function Products() {
  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="py-10">
        <AllProductsPage />
      </div>
      <Footer />
    </>
  );
}
