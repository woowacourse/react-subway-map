import styled from 'styled-components';
import { COLOR, LAYOUT, Z_INDEX } from '../../../constants';
import { Button } from '../..';
import '../../../assets/fonts.css';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem;
  height: ${LAYOUT.NAVBAR.HEIGHT};
  background-color: ${COLOR.THEME};

  z-index: ${Z_INDEX.MODAL};
`;

export const TitleButton = styled(Button)`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0.3rem;
  color: ${COLOR.TEXT.NAVBAR};
`;

export const MainTitle = styled.h1`
  font-size: 1.6rem;
  font-family: 'BM_HANNA';
`;

export const SubTitle = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 42.5%;
  min-width: 50rem;
`;

export const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
`;

export const MenuItem = styled.li`
  position: relative;
  margin: 0 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.02rem;

  & > a {
    display: flex;
    align-items: center;

    & > svg {
      margin-right: 0.25rem;
    }
  }

  & a {
    padding: 1rem 0;
  }

  &:hover ::after {
    @keyframes lining {
      0% {
        width: 0%;
      }
      100% {
        width: 100%;
      }
    }

    content: '';
    position: absolute;
    left: 0.1rem;
    bottom: 0;
    width: 100%;
    height: 0.3rem;

    background-color: ${COLOR.TEXT.NAVBAR};
    animation: lining 0.1s ease-out;
  }
`;
