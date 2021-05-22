import { createContext, HTMLAttributes, useState } from 'react';
import PALETTE from '../constants/palette';

type ThemeColor = 'NAVER' | 'BAEMIN' | 'KAKAO' | 'TOSS';

interface Theme {
  themeColor: string;
  changeTheme: (theme: ThemeColor) => void;
}

const ThemeContext = createContext<Theme | null>(null);

const ThemeProvider = ({ children }: HTMLAttributes<HTMLElement>) => {
  const [themeColor, setThemeColor] = useState<string>(PALETTE.BAEMIN);

  const changeTheme = (theme: ThemeColor): void => {
    setThemeColor(PALETTE[theme]);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, changeTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
export { ThemeContext };
