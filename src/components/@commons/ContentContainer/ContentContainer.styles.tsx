import styled from '@emotion/styled';
import { COLOR, SIZE } from '../../../constants/styleConstant';
import { Props } from './ContentContainer';

export const ContentContainer = styled.section<Props>`
  max-width: ${SIZE.PAGE_MAX_WIDTH};
  min-width: ${SIZE.PAGE_MIN_WIDTH};
  margin: 3rem;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-top: ${({ hatColor }) => hatColor && `0.75rem solid ${COLOR[hatColor]}`};
`;
