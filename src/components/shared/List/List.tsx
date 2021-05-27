import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import { Properties } from 'csstype';

const List = styled.ul<Properties>`
  max-height: ${({ maxHeight }) => maxHeight ?? '45vh'};
  overflow: auto;

  li {
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0 0.25rem;
    border-bottom: 1px solid ${PALETTE.GRAY_100};
    position: ${({ position }) => position ?? 'static'};

    p {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    button {
      margin-left: 0.5rem;
    }
  }
`;

export default List;
