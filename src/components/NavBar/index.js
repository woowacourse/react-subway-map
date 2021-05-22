import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink
          to={PATH}
          activeStyle={{
            background: 'rgba(153, 153, 153, 0.3)',
            borderRadius: '4px',
          }}
        >
          {NAME}
        </NavLink>
      </li>
    ))}
  </List>
);

const NavBar = () => (
  <Container>
    <NavLink to={ROUTE.HOME.PATH}>
      <Logo>
        <img src="/images/logo_small.png" alt="logo" />
        <span>RUNNING MAP</span>
      </Logo>
    </NavLink>
    <Menu />
  </Container>
);

export default NavBar;
