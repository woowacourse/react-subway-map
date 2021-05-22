import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { Page } from '../../../types';
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
            <a href={navInfo.path}>{navInfo.text}</a>
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
