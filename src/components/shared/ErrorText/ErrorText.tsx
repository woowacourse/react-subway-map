import styled from 'styled-components';
import { Properties } from 'csstype';
import PALETTE from '../../../constants/palette';

const ErrorText = styled.div<Properties>`
  font-size: 0.8rem;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
  color: ${PALETTE.RED_100};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
`;

export default ErrorText;
