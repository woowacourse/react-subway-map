import styled from 'styled-components';

import { COLOR } from '../../../constants';

export const Item = styled.li`
  margin: 1rem 1.75rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${COLOR.TEXT.PARAGRAPH};
  width: 100%;
`;

export const Nickname = styled.span`
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Name = styled.span`
  margin-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 200;
`;

export const Image = styled.img`
  width: 5.5rem;
`;
