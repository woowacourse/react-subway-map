import styled from '@emotion/styled';
import { COLOR } from '../../../constants/styleConstant';
import { Props } from './SelectInput';

type SelectProps = Omit<Props, 'initialText'>;

export const SelectInput = styled.select<SelectProps>`
  width: 100%;
  height: 100%;
  border-color: ${({ borderColor }) => (borderColor ? borderColor : COLOR.GRAY_800)};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  color: ${COLOR.GRAY_800};

  &:focus {
    outline-color: ${COLOR.GRAY_800};
  }
`;
