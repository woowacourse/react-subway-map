import { useState } from 'react';

const useLocalStorage = (key: string, initialValue = '') => {
  const [storageValue, setStorageValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStorageValue(value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return [storageValue, setValue];
};

export default useLocalStorage;
