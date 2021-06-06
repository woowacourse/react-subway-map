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
        <MenuGroup
          isVisible={isLogin}
          menuList={[
            { content: '전체보기', icon: <IconWindow />, route: ROUTE.MAP },
            { content: '경로탐색', icon: <IconSearch />, route: ROUTE.SEARCH },
          ]}
        />
        <MenuGroup
          isVisible={isLogin}
          menuList={[
            { content: '역관리', icon: <IconSetting />, route: ROUTE.STATION },
            { content: '노선관리', icon: <IconSetting />, route: ROUTE.LINE },
            { content: '구간관리', icon: <IconSetting />, route: ROUTE.SECTION },
          ]}
        />

        {isLogin ? (
          <MenuList isVisible={isLogin}>
            <MenuItem>
              <button onClick={handleLogoutRequest}>
                <IconPerson />
                로그아웃
              </button>
            </MenuItem>
          </MenuList>
        ) : (
          <MenuGroup
            isVisible={!isLogin}
            menuList={[{ content: '로그인', icon: <IconPerson />, route: ROUTE.LOGIN }]}
          />
        )}
      </Menu>
    </Nav>
  );
};

NavBar.propTypes = {
  serverOwner: PropTypes.string,
};

function MenuGroup(props) {
  const { menuList, ...rest } = props;

  return (
    <MenuList {...rest}>
      {menuList.map((item, index) => (
        <MenuItem key={index}>
          <NavLink activeClassName="selected" to={item.route}>
            {item.icon}
            {item.content}
          </NavLink>
        </MenuItem>
      ))}
    </MenuList>
  );
}

MenuGroup.propTypes = {
  menuList: PropTypes.array.isRequired,
};
