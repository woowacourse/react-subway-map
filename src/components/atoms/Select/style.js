import styled from 'styled-components';
import { COLOR } from '../../../constants';

export const Selector = styled.select`
  position: relative;
  height: auto;
  padding: 0.5rem 1.5rem;
  margin: 0.25rem;
  min-width: 5rem;

  line-height: inherit;
  font-size: 1rem;
  font-weight: 400;
  color: ${COLOR.TEXT.DEFAULT};
  border-radius: 0.25rem;
  border: 0.125rem solid ${COLOR.BORDER_DEFAULT};
  outline: none;

  &:focus {
    border-color: ${COLOR.THEME};
  }

  &:focus:invalid {
    border-color: ${COLOR.TEXT.DEFAULT};
  }
`;

export const Option = styled.option``;
