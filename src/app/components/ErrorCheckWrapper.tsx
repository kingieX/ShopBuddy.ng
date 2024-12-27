import { useEffect, useState, ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorCheckWrapperProps {
  children: ReactNode;
}

const ErrorCheckWrapper: React.FC<ErrorCheckWrapperProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null); // Track the connection state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Track error messages
  const router = useRouter();

  const connectionCheckedRef = useRef(false); // Track if the connection has been checked already

  const MAX_RETRIES = 3; // Max number of retry attempts
  const RETRY_DELAY = 2000; // Delay between retries in milliseconds

  // Retry connection check logic
  const retryConnectionCheck = async (
    retries: number = MAX_RETRIES
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/check-db', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache', // Prevent caching of API response
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch the API');
      }

      const data = await res.json();
      if (data.connected) {
        setIsConnected(true); // Connection successful
        return true;
      } else {
        throw new Error(data.error || 'Connection failed');
      }
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying connection check... ${retries} attempts left`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
        return retryConnectionCheck(retries - 1); // Retry connection
      }

      setIsConnected(false); // Mark as disconnected after retries fail
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  };

  useEffect(() => {
    // Prevent redundant checks if the connection is already checked
    if (connectionCheckedRef.current) return;

    const checkConnection = async () => {
      const isConnected = await retryConnectionCheck();
      if (!isConnected) {
        router.push('/error'); // Navigate to error page if connection fails
      } else {
        connectionCheckedRef.current = true; // Mark connection as checked
      }
    };

    checkConnection();
  }, [router]); // Only run this effect once when the component mounts

  // Show loading state while checking the connection
  if (isConnected === null) {
    return <div className="py-4 text-center">Loading...</div>;
  }

  // If database is connected, render the children (the rest of the app)
  return <>{children}</>;
};

export default ErrorCheckWrapper;
