import styled from '@emotion/styled';
import { Props } from './Input';
import { COLOR } from '../../../constants/style';

type InputProps = Omit<Props, 'type' | 'label'>;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Label = styled.div`
  position: absolute;
  left: 0.5rem;
  top: -0.75rem;
  background-color: white;
  padding: 0 0.5rem;
  color: ${COLOR.GRAY_400};
`;

export const Emoji = styled.img`
  position: absolute;
  width: auto;
  height: 60%;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.4;
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 100%;
  border-color: ${({ borderColor, error }) =>
    error ? COLOR.RED_400 : borderColor ? COLOR[borderColor] : COLOR.GRAY_400};
  border-width: 0.1rem;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  ${({ emoji }) => emoji && 'padding-left: 2.5rem'};

  &:focus {
    outline-color: ${({ error }) => (error ? COLOR.RED_400 : COLOR.GRAY_800)};
  }
`;
