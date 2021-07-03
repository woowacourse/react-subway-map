import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

const Icon = styled.span<React.CSSProperties>`
  color: ${({ color }) => color ?? PALETTE.GRAY_500};
  margin-right: ${({ marginRight }) => marginRight ?? '0.5rem'};

  * {
    height: 100%;
  }
`;

export default Icon;
