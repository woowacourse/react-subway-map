import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_INFO } from '../../../constants/appInfo';
import { StyledHeader, TitleContainer } from './Header.styles';

interface Props {
  children?: React.ReactNode;
  title: string;
  logo?: React.ReactNode;
}

const Header: FC<Props> = ({ children, title, logo }) => {
  return (
    <StyledHeader>
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

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  logo: PropTypes.node,
};

export default Header;
