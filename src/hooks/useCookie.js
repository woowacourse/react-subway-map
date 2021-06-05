import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';

export const useCookie = (cookieName) => {
  const [value, setValue] = useState(Cookies.get(cookieName) || null);

  const updateCookie = useCallback(
    (newValue, options = { path: '/' }) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName],
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie];
};
