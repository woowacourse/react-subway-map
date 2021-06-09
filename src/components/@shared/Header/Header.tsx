import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_INFO } from '../../../constants/appInfo';
import useCurrentAPIInfo from '../../../hooks/@shared/useCurrentAPIInfo/useCurrentAPIInfo';
import { StyledHeader, TitleContainer } from './Header.styles';

interface Props {
  children?: React.ReactNode;
  title: string;
  logo?: React.ReactNode;
}

const Header: FC<Props> = ({ children, title, logo }) => {
  const APIInfo = useCurrentAPIInfo();

  return (
    <StyledHeader themeColor={APIInfo.themeColor}>
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
