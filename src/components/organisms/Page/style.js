import styled from 'styled-components';
import { ButtonSquare } from '../..';
import { Z_INDEX } from '../../../constants';

export const ServerSelectButton = styled(ButtonSquare)`
  position: fixed;
  right: 2.5rem;
  bottom: 5rem;

  z-index: ${Z_INDEX.FIXED_BUTTON};
`;
