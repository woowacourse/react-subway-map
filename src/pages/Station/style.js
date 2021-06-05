import styled from 'styled-components';

import { COLOR } from '../../constants';

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const List = styled.ul`
  width: 90%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Message = styled.span`
  margin: -0.5rem 0 1rem;
  padding: 0 1rem;
  height: 1rem;

  color: ${COLOR.ERROR};
  font-size: 0.75rem;
`;

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
