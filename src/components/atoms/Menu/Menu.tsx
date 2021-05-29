import React from 'react';
import { Container } from './Menu.styles';

export interface MenuProps {
  children: React.ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  return <Container>{children}</Container>;
};

export default Menu;
