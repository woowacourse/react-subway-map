import styled from '@emotion/styled';
import { SIZE } from '../../../constants/styleConstant';
import { Props } from './ContentContainer';

export const ContentContainer = styled.section<Props>`
  max-width: ${SIZE.PAGE_MAX_WIDTH};
  min-width: ${SIZE.PAGE_MIN_WIDTH};
  height: fit-content;
  margin: 1.5rem;
  margin-top: 0;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-top: ${({ hasHat, theme }) => hasHat && `0.75rem solid ${theme.primaryColor}`};
`;
