import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ColorRadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  radioColor: string;
}

export const ColorRadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ColorRadioInput = styled.input<ColorRadioInputProps>`
  appearance: none;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${({ radioColor }) => radioColor};
    cursor: pointer;
  }

  &:checked::before {
    transform: scale(1.1);
  }

  &:checked::after {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: white;
    cursor: pointer;
  }

  &:disabled::before {
    cursor: not-allowed;
  }

  &:disabled::after {
    content: '✘';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: white;
    cursor: not-allowed;
  }
`;

export const ColorRadioLabelText = styled.div`
  margin-left: 0.5rem;
`;
