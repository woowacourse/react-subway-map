import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../constants';
import { Container, Logo, List } from './style';

const publicRoutes = [ROUTE.SIGN_IN];

const privateRoutes = [
  ROUTE.STATION_MANAGE,
  ROUTE.LINE_MANAGE,
  ROUTE.SECTION_MANAGE,
  ROUTE.SIGN_OUT,
];

const Menu = () => {
  const userToken = useSelector(({ user }) => user.token);
  const routes = userToken ? privateRoutes : publicRoutes;

  return (
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
};

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
