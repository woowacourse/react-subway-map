import styled from '@emotion/styled';
import PALETTE from 'constants/palette';
import unfoldArrow from 'assets/unfold-arrow.png';

const Select = styled.select`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0 8px;
  margin-top: 2px;
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

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: ${PALETTE.DARK_GRAY};

  &:focus-within {
    color: ${PALETTE.DEFAULT_BLACK};
  }
`;

export default { Select, Label };
