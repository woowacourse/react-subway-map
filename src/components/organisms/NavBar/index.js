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
        {/* TODO: 전체보기 기능, 경로탐색 기능 2단계에서 추가 */}
        <MenuGroup
          style={{ visibility: 'hidden' }}
          menuList={[
            { content: '전체보기', icon: <IconWindow />, route: ROUTE.MAP },
            { content: '경로탐색', icon: <IconSearch />, route: ROUTE.SEARCH },
          ]}
        />

        {isLogin && (
          <MenuGroup
            menuList={[
              { content: '역관리', icon: <IconSetting />, route: ROUTE.STATION },
              { content: '노선관리', icon: <IconSetting />, route: ROUTE.LINE },
              { content: '구간관리', icon: <IconSetting />, route: ROUTE.SECTION },
            ]}
          />
        )}

        <MenuList>
          <MenuItem>
            {isLogin ? (
              <button onClick={handleLogoutRequest}>
                <IconPerson />
                로그아웃
              </button>
            ) : (
              <NavLink activeClassName="selected" to={ROUTE.LOGIN}>
                <IconPerson />
                로그인
              </NavLink>
            )}
          </MenuItem>
        </MenuList>
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
      {menuList.map((item) => (
        <MenuItem>
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
