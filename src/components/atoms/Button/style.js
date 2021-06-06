import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const StyledButton = styled.button`
  font-weight: 700;
  letter-spacing: 0.05rem;
  color: ${COLOR.TEXT_DEFAULT};
  background-color: ${COLOR.THEME};
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.15);

  &:active {
    background-color: ${COLOR.THEME_STRONG};
  }
  &:disabled {
    background-color: ${COLOR.THEME_LIGHT};
  }
`;
