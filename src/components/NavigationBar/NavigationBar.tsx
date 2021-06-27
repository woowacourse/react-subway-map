import { useHistory } from 'react-router';
import useLogin from '../../hooks/useLogin';
import {
  NavigationBarContainer,
  Logo,
  LogoImg,
  StyledNavLink,
  NaviLinkContainer,
} from './NavigationBar.styles';

const NavigationBar = () => {
  const { isLogin, logout } = useLogin();
  const history = useHistory();

  return (
    <NavigationBarContainer>
      <Logo onClick={() => history.push('/')}>
        <LogoImg src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
      </Logo>
      <NaviLinkContainer>
        <StyledNavLink to="/station">역 관리</StyledNavLink>
        <StyledNavLink to="/line">노선 관리</StyledNavLink>
        <StyledNavLink to="/section">구간 관리</StyledNavLink>
        <StyledNavLink to="/maps">전체 노선</StyledNavLink>
        {isLogin ? (
          <StyledNavLink to="/login" onClick={logout}>
            로그아웃
          </StyledNavLink>
        ) : (
          <StyledNavLink to="/login">로그인</StyledNavLink>
        )}
      </NaviLinkContainer>
    </NavigationBarContainer>
  );
};

export default NavigationBar;
