import { createContext, ReactNode, useState } from 'react';

interface LoadingProviderProps {
  children: ReactNode;
}

interface Loading {
  isLoading: boolean;
  callWithLoading: (callback: (...args: any[]) => Promise<unknown>, ...args: any[]) => void;
}

const LoadingContext = createContext<Loading | null>(null);
const PREVENT_LOADING_TIME = 500;

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callWithLoading = async (
    callback: (...args: any[]) => Promise<unknown>,
    ...args: any[]
  ) => {
    const timer = setTimeout(() => setIsLoading(true), PREVENT_LOADING_TIME);

    await callback(...args);
    clearTimeout(timer);
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, callWithLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
export { LoadingContext };
