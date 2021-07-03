import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from 'react';
import API from '../apis/user';

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const isMounted = useRef(true);

  useEffect(() => {
    if (!isMounted.current && isLoggedIn === false) {
      localStorage.setItem('accessToken', '');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    isMounted.current = false;

    (async () => {
      const response = await API.get();

      if (response.ok) {
        setIsLoggedIn(true);
        return;
      }

      console.error(response.error);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
