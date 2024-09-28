import Image from 'next/image';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar isSignedIn={false} isAuthPage={false} profileImage={''} />
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <h1>Main page under constrution</h1>
      </div>
      <Footer />
    </>
  );
}
