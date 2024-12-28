import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorCheckWrapperProps {
  children: ReactNode;
}

const ErrorCheckWrapper: React.FC<ErrorCheckWrapperProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('/api/check-db', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await res.json();

        if (data.success) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
          setErrorMessage(data.message);
          router.push('/error');
        }
      } catch (error) {
        setIsConnected(false);
        setErrorMessage(
          'An error occurred while checking the database connection.'
        );
        router.push('/error');
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      // Redirect to the error page if the database is not connected
      router.push('/error');
    }
  }, [isConnected, router]);

  //   if (isConnected === null) {
  //     return (
  //       <div className="py-4 text-center">Checking database connection...</div>
  //     ); // Tailwind loading state
  //   }

  // If database is connected, render children (the rest of the app)
  return <>{children}</>;
};

export default ErrorCheckWrapper;
