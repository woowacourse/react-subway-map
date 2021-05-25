import styled from 'styled-components';
import { COLOR } from '../../../constants';

export const Label = styled.label`
  margin: 1rem;
  position: relative;
`;

export const InputField = styled.input`
  width: 20rem;
  padding: 0.65rem 1.5rem 0.6rem 3.5rem;

  font-size: 1rem;
  color: ${COLOR.TEXT.DEFAULT};
  border-radius: 0.25rem;
  border: 0.125rem solid ${COLOR.BORDER_DEFAULT};

  &::placeholder {
    color: ${COLOR.PLACEHOLDER};
  }

  &:focus {
    outline-color: ${COLOR.THEME};
  }
`;

export const Icon = styled.span`
  position: absolute;
  top: 0.6rem;
  left: 1.25rem;
`;

export const Message = styled.span``;
