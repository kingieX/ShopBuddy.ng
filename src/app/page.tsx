import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './home/HomePage';

export default function Home() {
  return (
    <>
      <Navbar isAuthPage={false} />
      <div>
        <HomePage />
      </div>
      <Footer />
    </>
  );
}
