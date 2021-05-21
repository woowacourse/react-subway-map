import React from 'react';
import * as Styled from './Header.styles';
import { ReactComponent as SubwayIcon } from '../../assets/icons/subway-solid.svg';

interface IProps {
  children: React.ReactNode;
}

const Header = ({ children }: IProps) => (
  <Styled.Header>
    <Styled.Logo>
      <SubwayIcon />
      오늘도 역시 서브웨이
    </Styled.Logo>
    {children}
  </Styled.Header>
);

export default Header;
