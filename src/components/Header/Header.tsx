import React from 'react';
import * as Styled from './Header.styles';
import { ReactComponent as SubwayIcon } from '../../assets/icons/subway-solid.svg';

interface Props {
  children: React.ReactNode;
}

const Header = ({ children }: Props) => (
  <Styled.Header>
    <Styled.Logo>
      <SubwayIcon />
      오늘도 역시 서브웨이
    </Styled.Logo>
    {children}
  </Styled.Header>
);

export default Header;
