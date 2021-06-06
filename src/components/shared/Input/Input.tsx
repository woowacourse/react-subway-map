import { Properties } from 'csstype';
import styled from 'styled-components';

import PALETTE from '../../../constants/palette';

const Input = styled.input<Properties>`
  width: 100%;
  line-height: 1.5;

  ::placeholder {
    color: ${PALETTE.GRAY_300};
  }
`;

export default Input;
