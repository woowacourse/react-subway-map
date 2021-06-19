import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

const SelectBox = styled.select`
  height: 3rem;
  font-size: 1rem;
  padding: 0 1rem;
  border-color: ${PALETTE.GRAY[500]};
  border-radius: 3px;
`;

export default SelectBox;
