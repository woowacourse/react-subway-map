import { createContext, ReactNode, useEffect, useState } from 'react';
import api from '../apis';
import { STORAGE_KEY } from '../constants/storage';

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  isLoggedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const { isSucceeded } = await api.user.getInfo();

      if (isSucceeded) {
        setIsLoggedIn(true);
      }
    })();
  }, []);

  const login = (accessToken: string) => {
    setIsLoggedIn(true);
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('accessToken', '');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
