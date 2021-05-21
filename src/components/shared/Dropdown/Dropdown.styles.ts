import styled from '@emotion/styled';
import PALETTE from 'constants/palette';
import unfoldArrow from 'assets/unfold-arrow.png';

const Select = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0 8px;
  appearance: none;
  background: url(${unfoldArrow}) no-repeat 97% 50%/15px auto;
  outline: none;

  &:focus {
    border: 2px solid ${PALETTE.DEFAULT_BLACK};
  }

  /* IE 10, 11의 네이티브 화살표 숨기기 */
  &::-ms-expand {
    display: none;
  }
`;

export default { Select };
