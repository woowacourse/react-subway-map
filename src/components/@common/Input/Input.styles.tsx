import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

interface InputLabelProps {
  placeholder?: string;
}

export const InputLabel = styled.label<InputLabelProps>`
  position: relative;
  width: 100%;
`;

export const LabelText = styled.span`
  display: block;
  position: absolute;
  top: -0.35rem;
  left: 0.625rem;
  background-color: white;
  color: ${PALETTE.GRAY_500};
  font-weight: 500;
  width: max-content;
  font-size: 0.75rem;
  padding: 0 0.25rem;
`;

export const StyledInput = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  display: block;
  height: 3rem;
  padding: 0 1rem;
  border: 1px solid ${PALETTE.GRAY_500};
  border-radius: 0.25rem;
  font-size: 1rem;
  width: 100%;

  &:focus {
    border: 1px solid ${PALETTE.GRAY_700};
  }
`;
