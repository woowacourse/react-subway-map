import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const Input = styled.input`
  width: 100%;
  height: 44px;
  border: 1px solid ${PALETTE.DARK_GRAY};
  border-radius: 4px;
  padding: 0 8px;
  margin-top: 2px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border: 2px solid #333333;
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
