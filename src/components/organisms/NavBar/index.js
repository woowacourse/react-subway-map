import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { useLogin } from '../../../hooks';
import { IconLogo, IconPerson, IconSearch, IconSetting, IconWindow } from '../..';
import { Nav, TitleButton, Title, SubTitle, MainTitle, Menu, MenuList, MenuItem } from './style';
import { ROUTE } from '../../../constants';

const FE_CONTRIBUTORS = '티케 하루의';

export const NavBar = (props) => {
  const { serverOwner } = props;
  const { isLogin, isLogout, requestLogout, removeToken, goToAllowedPage, notifyLogoutResult } = useLogin();
  const subTitle = serverOwner ? `${serverOwner} & ${FE_CONTRIBUTORS}` : `${FE_CONTRIBUTORS}`;

  const handleLogoutRequest = () => requestLogout();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isLogout) {
      notifyLogoutResult();
      removeToken();
      goToAllowedPage();
    }
  }, [isLogout]);

  return (
    <Nav>
      <TitleButton>
        <IconLogo />
        <Title>
          <SubTitle>{subTitle}</SubTitle>
          <MainTitle>우아한 지하철노선도</MainTitle>
        </Title>
      </TitleButton>

      <Menu>
        <MultipleMenus
          isVisible={isLogin}
          menuList={[
            { content: '전체보기', icon: <IconWindow />, route: ROUTE.MAP },
            { content: '경로탐색', icon: <IconSearch />, route: ROUTE.SEARCH },
          ]}
        />
        <MultipleMenus
          isVisible={isLogin}
          menuList={[
            { content: '역관리', icon: <IconSetting />, route: ROUTE.STATION },
            { content: '노선관리', icon: <IconSetting />, route: ROUTE.LINE },
            { content: '구간관리', icon: <IconSetting />, route: ROUTE.SECTION },
          ]}
        />

        {isLogin ? (
          <SingleMenu>
            <button onClick={handleLogoutRequest}>
              <IconPerson />
              로그아웃
            </button>
          </SingleMenu>
        ) : (
          <SingleMenu>
            <NavLink activeClassName="selected" to={ROUTE.LOGIN}>
              <IconPerson />
              {'로그인'}
            </NavLink>
          </SingleMenu>
        )}
      </Menu>
    </Nav>
  );
};

NavBar.propTypes = {
  serverOwner: PropTypes.string,
};

function MultipleMenus(props) {
  const { menuList, isVisible, ...rest } = props;

  return (
    <MenuList isVisible={isVisible} {...rest}>
      {menuList.map((menuEntity, index) => (
        <MenuItem key={index}>
          <NavLink activeClassName="selected" to={menuEntity.route}>
            {menuEntity.icon}
            {menuEntity.content}
          </NavLink>
        </MenuItem>
      ))}
    </MenuList>
  );
}

MultipleMenus.propTypes = {
  menuList: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

function SingleMenu(props) {
  const { children, ...rest } = props;

  return (
    <MenuList isVisible {...rest}>
      <MenuItem>{children}</MenuItem>
    </MenuList>
  );
}

MultipleMenus.propTypes = {
  children: PropTypes.node.isRequired,
};
