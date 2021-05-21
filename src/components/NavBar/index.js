import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants';
import { Container, Logo, List } from './style';

const routes = [
  ROUTE.STATION_MANAGE,
  ROUTE.LINE_MANAGE,
  ROUTE.SECTION_MANAGE,
  ROUTE.SIGN_IN,
];

const Menu = () => (
  <List>
    {routes.map(({ NAME, PATH }, index) => (
      <li key={index}>
        <Link to={PATH}>{NAME}</Link>
      </li>
    ))}
  </List>
);

const NavBar = () => (
  <Container>
    <Link to={ROUTE.HOME.PATH}>
      <Logo>
        <img src="/images/logo_small.png" alt="logo" />
        <span>RUNNING MAP</span>
      </Logo>
    </Link>
    <Menu />
  </Container>
);

export default NavBar;
