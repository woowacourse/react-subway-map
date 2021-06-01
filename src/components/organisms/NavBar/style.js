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
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
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
  font-family: 'BM_HANNA';
`;

export const MainTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 200;
`;

export const SubTitle = styled.span`
  font-size: 1rem;
  margin-bottom: 0.5rem;
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
  display: flex;
  justify-content: center;
  margin: 0 1rem;

  min-width: 5.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.02rem;

  & > a,
  > button {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    font: inherit;

    & > svg {
      margin-right: 0.25rem;
    }
  }

  & > a::after {
    content: '';
    position: absolute;
    left: 0.1rem;
    bottom: 0;
    width: 100%;
    height: 0.3rem;

    background-color: transparent;
  }

  &:hover > a::after {
    @keyframes lining {
      0% {
        width: 0%;
      }
      100% {
        width: 100%;
      }
    }
    background-color: ${COLOR.TEXT.NAVBAR};
    animation: lining 0.1s ease-out;
  }

  & > a.selected::after {
    background-color: ${COLOR.TEXT.NAVBAR};
  }
`;
