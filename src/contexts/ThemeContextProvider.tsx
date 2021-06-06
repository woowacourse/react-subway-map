import { createContext, HTMLAttributes, useState } from 'react';
import PALETTE from '../constants/palette';

type ThemeColor = 'NAVER' | 'BAEMIN' | 'KAKAO' | 'TOSS';

interface Theme {
  themeColor: string;
  changeTheme: (theme: ThemeColor) => void;
}

const ThemeContext = createContext<Theme | null>(null);
const apiHostName = localStorage.getItem('hostName');
const hostColor: { [key: string]: ThemeColor } = {
  OZ: 'NAVER',
  SOLONG: 'BAEMIN',
  KROPPLE: 'KAKAO',
  NABOM: 'TOSS',
};

const ThemeProvider = ({ children }: HTMLAttributes<HTMLElement>) => {
  const [themeColor, setThemeColor] = useState<string>(
    apiHostName ? PALETTE[hostColor[apiHostName]] : PALETTE.BAEMIN
  );

  const changeTheme = (theme: ThemeColor): void => {
    setThemeColor(PALETTE[theme]);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, changeTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
export { ThemeContext };
