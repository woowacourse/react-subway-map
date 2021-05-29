import styled from '@emotion/styled';
import { COLOR } from '../../../constants/styleConstant';
import { Props } from './SelectInput';

type SelectProps = Omit<Props, 'initialText'>;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const SelectInput = styled.select<SelectProps>`
  width: 100%;
  height: 100%;
  border-color: ${({ borderColor, error }) =>
    error ? COLOR.RED_400 : borderColor ? COLOR[borderColor] : COLOR.GRAY_400};
  border-radius: 0.25rem;
  border-width: 0.1rem;
  padding: 0.5rem 1rem;
  color: ${COLOR.GRAY_800};

  &:focus {
    outline-color: ${({ error }) => (error ? COLOR.RED_400 : COLOR.GRAY_700)};
  }
`;

export const Label = styled.div`
  position: absolute;
  left: 0.5rem;
  top: -0.75rem;
  background-color: white;
  padding: 0 0.5rem;
  color: ${COLOR.GRAY_400};
`;
