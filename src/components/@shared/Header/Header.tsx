import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_INFO } from '../../../constants/appInfo';
import useThemeColor from '../../../hooks/useThemeColor';
import { StyledHeader, TitleContainer } from './Header.styles';

interface Props {
  children?: React.ReactNode;
  title: string;
  logo?: React.ReactNode;
}

const Header = ({ children, title, logo }: Props): JSX.Element => {
  const themeColor = useThemeColor();

  return (
    <StyledHeader themeColor={themeColor}>
      <Link to={PAGE_INFO.HOME.path}>
        <TitleContainer>
          {logo}
          <h1>{title}</h1>
        </TitleContainer>
      </Link>
      {children}
    </StyledHeader>
  );
};

export default Header;
