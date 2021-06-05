import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const Input = styled.input<{ icon?: string }>`
  width: 100%;
  height: 44px;
  border: 1px solid ${PALETTE.DARK_GRAY};
  border-radius: 4px;
  padding: 0 8px;
  margin-top: 2px;
  font-size: 1rem;
  outline: none;
  background: no-repeat 2% center/4% url(${({ icon }) => icon && icon});
  padding-left: ${({ icon }) => icon && '40px'};

  &:focus {
    border: 2px solid #333333;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: ${PALETTE.DARK_GRAY};

  &:focus-within {
    color: ${PALETTE.DEFAULT_BLACK};
  }
`;

export default { Input, Label };
