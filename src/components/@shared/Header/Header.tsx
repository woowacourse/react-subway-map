import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_INFO } from '../../../constants/api';
import { PAGE_INFO } from '../../../constants/appInfo';
import { RootState } from '../../../redux/store';
import { StyledHeader, TitleContainer } from './Header.styles';

interface Props {
  children?: React.ReactNode;
  title: string;
  logo?: React.ReactNode;
}

const Header = ({ children, title, logo }: Props): JSX.Element => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);

  return (
    <StyledHeader themeColor={API_INFO[apiOwner].themeColor}>
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
