import styled from 'styled-components';
import { ButtonSquare } from '../..';
import { LAYOUT, Z_INDEX } from '../../../constants';

export const ServerSelectButton = styled(ButtonSquare)`
  position: fixed;
  right: 2.5rem;
  bottom: 5rem;

  z-index: ${Z_INDEX.FIXED_BUTTON};
`;

export const Header = styled.header`
  height: ${LAYOUT.NAVBAR.HEIGHT};
`;

export const Main = styled.section`
  margin: 0 auto;
  padding-top: 10vh;

  min-width: 40rem;
  width: 40vw;
  max-width: 42.5rem;
`;
