import styled from '@emotion/styled';
import { Props } from './Input';
import { COLOR } from '../../../constants/styleConstant';

type InputProps = Omit<Props, 'type' | 'label'>;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Label = styled.div`
  position: absolute;
  left: 0.5rem;
  top: -0.5rem;
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
  border-color: ${({ borderColor }) => (borderColor ? borderColor : COLOR.GRAY_800)};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  ${({ emoji }) => emoji && 'padding-left: 2.5rem'};
  &:focus {
    outline-color: ${COLOR.GRAY_800};
  }
`;
