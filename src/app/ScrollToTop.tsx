'use client'; // Ensure this is a client component
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // Effect runs whenever the pathname changes

  return <>{children}</>;
};

export default ScrollToTop;
