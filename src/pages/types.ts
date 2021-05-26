import { Dispatch, SetStateAction } from 'react';

interface PageProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export type { PageProps };
