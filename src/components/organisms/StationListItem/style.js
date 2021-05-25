import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;

  line-height: 2rem;
  border-bottom: 0.125rem solid ${COLOR.BORDER_DEFAULT};
`;

export const Name = styled.span`
  flex-grow: 1;
  padding-left: 1rem;

  color: ${COLOR.TEXT.DEFAULT};
  letter-spacing: -0.01rem;
`;
