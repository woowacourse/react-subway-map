import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { Page } from '../../../types';
import StyledLink from '../StyledLink/StyledLink';
import { NavList } from './Navigation.styles';

interface Props {
  navInfoList: Page[];
}

const Navigation: FC<Props> = ({ navInfoList }) => {
  return (
    <nav>
      <NavList>
        {navInfoList.map((navInfo, index) => (
          <li key={index}>
            <StyledLink to={navInfo.path}>{navInfo.text}</StyledLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
};

Navigation.propTypes = {
  navInfoList: PropTypes.array.isRequired,
};

export default Navigation;
